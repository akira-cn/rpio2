'use strict';

const rpio = require('../rpio_sim.js'),
      Gpio = require('./gpio.js'),
      GpioGroup = require('./gpio_group.js'),
      ReadStream = require('./read_stream.js'),
      WriteStream = require('./write_stream.js');

Gpio.createReadStream = function (pin, options) {
  return new ReadStream(pin, options);
};
Gpio.createWriteStream = function (pin, options) {
  return new WriteStream(pin, options);
};

var rpio2 = {
  init: rpio.init,
  rpio: rpio,
  Gpio: Gpio,
  ReadStream: ReadStream,
  WriteStream: WriteStream,
  GpioGroup: GpioGroup
};

require('./gpio_util.js').defineStaticProperties(rpio2);

module.exports = rpio2;