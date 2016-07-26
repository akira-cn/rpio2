'use strict';

const rpio = require('rpio'),
      util = require('util'),
      EventEmitter = require('events').EventEmitter;

function updateEdge(gpio, type){
  var changes = gpio.listeners('change').length,
      risings = gpio.listeners('rising').length,
      fallings = gpio.listeners('falling').length;

  var edge = gpio.edge;

  function triggerEvent(pin){
    gpio.emit('change', gpio, pin);
    if(gpio.value) gpio.emit('rising', gpio, pin);
    else gpio.emit('falling', gpio, pin);    
  }

  if(type === 'change'){
    changes ++;
  }else if(type === 'rising'){
    risings ++;
  }else if(type === 'falling'){
    fallings ++;
  }

  if(changes > 0 || 
    risings > 0 && fallings > 0){
    if(edge !== rpio.POLL_BOTH){
      gpio.edge = rpio.POLL_BOTH;
      if(edge !== rpio.POLL_NONE){
        rpio.poll(gpio.pin, null);
      }
      rpio.poll(gpio.pin, triggerEvent, rpio.POLL_BOTH);
    }
  }else if(risings > 0){
    if(edge !== rpio.POLL_HIGH){
      gpio.edge = rpio.POLL_HIGH;
      if(edge !== rpio.POLL_NONE){
        rpio.poll(gpio.pin, null);
      }
      rpio.poll(gpio.pin, triggerEvent, rpio.POLL_HIGH);  
    }
  }else if(fallings > 0){
    if(edge !== rpio.POLL_LOW){
      gpio.edge = rpio.POLL_LOW;
      if(edge !== rpio.POLL_NONE){
        rpio.poll(gpio.pin, null);
      }
      rpio.poll(gpio.pin, triggerEvent, rpio.POLL_LOW);
    }    
  }else{
    if(edge !== rpio.POLL_NONE){
      rpio.poll(gpio.pin, null);
    }
    gpio.edge = rpio.POLL_NONE;
  }
}

function Gpio(pin, activeLow){
  this.pin = pin;
  this.edge = rpio.POLL_NONE;
  this.activeLow = !!activeLow;
  
  this.on('removeListener', function(type){
    updateEdge(this);
  });

  this.on('newListener', function(type){
    updateEdge(this, type);
  });

  //private properties
  var mode = -1;
  Object.defineProperty(this, '_mode', {
    get: function(){
      return mode;
    },
    set: function(value){
      mode = value;
    },
    enumerable: false
  });

  var state = -1;
  Object.defineProperty(this, '_state', {
    get: function(){
      return state;
    },
    set: function(value){
      state = value;
    },
    enumerable: false
  });
}

util.inherits(Gpio, EventEmitter);

Gpio.init = rpio.init;
require('./gpio_util.js').defineStaticProperties(Gpio);

Object.assign(Gpio.prototype, {
  open: function(mode, value){
    this._mode = mode;
    if(mode === rpio.INPUT){
      this._state = value;
    }
    return rpio.open(this.pin, mode, value);
  },
  close: function(){
    this.removeAllListeners();
    this._mode = this._state = -1;
    return rpio.close(this.pin);
  },
  read: function(length){
    if(length === undefined){
      return this.value;
    }else{
      var buf = new Buffer(length);
      rpio.readbuf(this.pin, buf, length);

      if(this.activeLow){
        for(var i = 0; i < buf.length; i++){
          buf[i] ^= 1;
        }
      }

      return buf;
    }
  },
  write: function(buf, length){
    
    var self = this;

    function writeData(){
      if(self.activeLow){
        var newBuf = new Buffer(length || buf.length);
        for(var i = 0; i < newBuf.length; i++){
          newBuf[i] = 1 ^ buf[i];
        }
        return rpio.writebuf(self.pin, newBuf, length);
      }else{      
        return rpio.writebuf(self.pin, buf, length);
      }      
    }

    if(length === undefined && buf === 0 || buf === 1){
      //gpio.write(1)
      this.value = buf;
      return;
    }else if(typeof buf === 'string'){
      //gpio.write('1010101')
      buf = new Buffer(buf.trim().split('').map(function(i){return 0|i}));
      return writeData();
    }else if(typeof buf === 'number'){
      //gpio.write(0b10101010);
      return this.write(buf.toString(2), length);
    }else if(buf instanceof Buffer){
      if(buf[0] !== 0 && buf[0] !== 1){
        //Buffer<'0','1','0','1'...>
        return this.write(buf.toString(), length);
      }else{
        //Buffer<00,01,00,01...>
        return writeData();
      }
    }
  },
  sleep: function(ms, async){
    if(!async){
      return rpio.msleep(ms);
    }
    return new Promise(function(resolve){
      setTimeout(resolve, ms); 
    });
  },
  toggle: function(){
    this.value ^= 1;
    return this.value;
  }
});

Object.defineProperty(Gpio.prototype, 'value', {
  get: function(){
    return this.activeLow ^ rpio.read(this.pin);
  },
  set: function(value){
    rpio.write(this.pin, this.activeLow ^ value);
  }
});

Object.defineProperty(Gpio.prototype, 'mode', {
  get: function(){
    return this._mode;
  },
  set: function(mode){
    this._mode = mode;
    rpio.mode(this.pin, mode);
  }
});

Object.defineProperty(Gpio.prototype, 'state', {
  get: function(){
    return this._state;
  },
  set: function(state){
    this._state = state;
    rpio.pud(this.pin, state);
  }
});

module.exports = Gpio;
