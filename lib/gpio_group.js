'use strict';

const Gpio = require('./gpio.js');

function GpioGroup(pins, activeLow){
  this.gpios = pins.map(function(pin){
    return new Gpio(pin, activeLow);
  });
}

GpioGroup.init = Gpio.init;
require('./gpio_util.js').defineStaticProperties(GpioGroup);

Object.assign(GpioGroup.prototype, {
  open: function(){
    var args = [].slice.call(arguments);
    return this.gpios.map(function(gpio){
      return gpio.open.apply(gpio, args);
    });
  },
  close: function(){
    var args = [].slice.call(arguments);
    return this.gpios.map(function(gpio){
      return gpio.close.apply(gpio, args);
    });    
  },
  sleep: function(ms){
    return Gpio.prototype.sleep(ms);
  }
});

Object.defineProperty(GpioGroup.prototype, 'value', {
  get: function(){
    var args = [].slice.call(arguments);
    var values = this.gpios.map(function(gpio){
      return gpio.value;
    });
    return parseInt(values.join(''), 2);
  },
  set: function(value){
    var len = this.gpios.length;
    var padStr = new Array(len).join('0');
    value = (padStr + value.toString(2)).slice(-len);
    var self = this;

    return value.split('').map(function(val, idx){
      var gpio = self.gpios[idx];
      return gpio.value = 0|val;
    });
  }
});

module.exports = GpioGroup;
