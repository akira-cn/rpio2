'use strict';

const child_process = require('child_process');

var pinMap = {
  3: 2,
  5: 3,
  7: 4,
  8: 14,
  10: 15,
  11: 17,
  12: 18,
  13: 27,
  15: 22,
  16: 23,
  18: 24,
  19: 10,
  21: 9,
  22: 25,
  23: 11,
  24: 8,
  26: 7,
  29: 5,
  31: 6,
  32: 12,
  33: 13,
  35: 19,
  36: 16,
  37: 26,
  38: 20,
  40: 21
};

var config = {
  mapping : 'physical'
};

var gpios = {

};

var fs = require('fs');
var chokidar = require('chokidar');

module.exports = {
  helper: function (pin, signal){
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }    
    return new Promise(function(resolve, reject){
      child_process.exec('node ./test/rpio_sim_helper ' + pin + ' ' + signal, 
        function(err, res){
          if(err) reject(err);
          else resolve(res);
        });
    });
  },
  //constants
  UNKNOWN: -1,
  HIGH : 1,
  LOW : 0,
  INPUT : 0,
  OUTPUT : 1,
  PULL_OFF : 0,
  PULL_DOWN : 1,
  PULL_UP : 2,
  PULL_DEFAULT : -1,
  POLL_NONE : 0,
  POLL_LOW : 1,
  POLL_HIGH : 2,
  POLL_BOTH : 3,
  init: function(options){
    config.mapping = options.mapping || 'physical';
  },
  open: function(pin, mode, state, debug){
    if(debug){
      console.log(pin, mode, state);
    }
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }
    if(!pin){
      console.error('no such pin.');
      return;
    }

    var gpio = {
      mode: mode,
      state: state || this.PULL_DEFAULT
    };

    var file = './test/gpio/gpio' + pin;

    Object.defineProperty(gpio, 'value', {
      get: function(){
        return fs.readFileSync(file)[0];
      },
      set: function(value){
        fs.writeFileSync(file, new Buffer([value]));
      }
    });

    if(mode === this.INPUT){
      if(gpio.state === this.PULL_DEFAULT
        || gpio.state === this.PULL_OFF){
        gpio.value = pin <= 8 ? 1 : 0;
      }else{
        gpio.value = gpio.state === this.PULL_UP ? 1 : 0;
      }
    }else{
      gpio.value = state;
    }

    gpios[pin] = gpio;

    return gpio;
  },
  close: function(pin){
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }
    if(!pin){
      console.error('no such pin.');
      return;
    }
    var gpio = gpios[pin];
    var file = './test/gpio/gpio' + pin;
    if(gpio.watcher){
      gpio.watcher.unwatch(file);
      gpio.watcher.close();
      delete gpio.watcher;
    }
    fs.unlinkSync(file);
    delete gpios[pin];
  },
  read: function(pin){
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }
    var gpio = gpios[pin];
    if(!pin || !gpios){
      console.error('the pin not avaliable!');
      return;
    }
    return gpio.value;
  },
  write: function(pin, value){
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }
    var gpio = gpios[pin];
    if(gpio.mode === this.INPUT){
      throw new Error('input pin is readonly.');
    }
    gpio.value = value;
  },
  readbuf: function(pin, buf, length){
    length = length || buf.length;
    for(var i = 0; i < length && i < buf.length; i++){
      buf[i] = this.read(pin);
    }
    return buf[i];
  },
  writebuf: function(pin, buf, length){
    length = length || buf.length;
    for(var i = 0; i < length && i < buf.length; i++){
      this.write(pin, buf[i]);
    }
  },
  poll: function(pin, cb, direction){
    direction = direction || this.POLL_NONE;
    var gpioPin = pin;
    if(config.mapping === 'physical'){
      gpioPin = pinMap[pin];
    }
    var gpio = gpios[gpioPin];
    if(gpio.mode === this.OUTPUT){
      throw new Error('cannot listening a output pin');
    }    

    direction = direction || this.POLL_NONE;
    var file = './test/gpio/gpio' + gpioPin;

    if(cb){
      //console.log('add watcher', file, direction);
      var self = this;
      gpio.watcher = chokidar.watch(file);

      gpio.watcher.on('change', function(path){
        if(gpio.watchedValue == null){
          gpio.watchedValue = gpio.value; //first created
          return;
        }else if(gpio.watchedValue === gpio.value){
          return;
        }
        gpio.watchedValue = gpio.value;
        //console.log('trigger watcher', direction);
        if(gpio.value == 1 && (direction === self.POLL_HIGH || direction === self.POLL_BOTH)){
          cb(pin);
        }
        if(gpio.value == 0 && (direction === self.POLL_LOW || direction === self.POLL_BOTH)){
          cb(pin);
        }        
      });
    }else{
      if(gpio.watcher){
        gpio.watcher.unwatch(file);
        gpio.watcher.close();
        //console.log('remove watcher', file);
        delete gpio.watcher;
      }
    }
  },
  msleep: function(ms){
    var t = Date.now();
    while(Date.now() - t < ms);
  },
  mode: function(pin, mode){
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }
    var gpio = gpios[pin];
    gpio.mode = mode;    
  },
  pud: function(pin, state){
    if(config.mapping === 'physical'){
      pin = pinMap[pin];
    }
    var gpio = gpios[pin];
    gpio.state = state;    
  }
};
