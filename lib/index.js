'use strict';

const rpio = require('rpio'),
      Gpio = require('./gpio.js'),
      GpioGroup = require('./gpio_group.js');

rpio.POLL_DEFAULT = -1;
rpio.POLL_NONE = 0;
rpio.PULL_DEFAULT = -1;
rpio.UNKNOWN = -1;

const props = [
  'UNKNOWN','INPUT','OUTPUT',
  'PULL_OFF','PULL_DOWN','PULL_UP','PULL_DEFAULT',
  'HIGH','LOW',
  'POLL_DEFAULT','POLL_NONE','POLL_LOW','POLL_HIGH','POLL_BOTH'
];

function defineStaticProperties(obj){
  props.forEach(function(prop){
    Object.defineProperty(obj, prop, {
      value: rpio[prop],
      writable: false,
      configurable: false,
      enumerable: true
    });
  });
}

defineStaticProperties(Gpio);
defineStaticProperties(GpioGroup);

Gpio.init = GpioGroup.init = rpio.init;

var rpio2 = {
  init: rpio.init,
  rpio: rpio,
  Gpio: Gpio,
  GpioGroup: GpioGroup
}

defineStaticProperties(rpio2);

module.exports = rpio2;
