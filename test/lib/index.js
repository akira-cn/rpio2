'use strict';

global._$jscoverage = global._$jscoverage || {};
_$jscoverage['index.js'] = [];
_$jscoverage['index.js'][3] = 0;
_$jscoverage['index.js'][9] = 0;
_$jscoverage['index.js'][10] = 0;
_$jscoverage['index.js'][12] = 0;
_$jscoverage['index.js'][13] = 0;
_$jscoverage['index.js'][16] = 0;
_$jscoverage['index.js'][25] = 0;
_$jscoverage['index.js'][27] = 0;
_$jscoverage['index.js'].source = ['\'use strict\';', '', 'const rpio = require(\'rpio\'),', '      Gpio = require(\'./gpio.js\'),', '      GpioGroup = require(\'./gpio_group.js\'),', '      ReadStream = require(\'./read_stream.js\'),', '      WriteStream = require(\'./write_stream.js\');', '', 'Gpio.createReadStream = function(pin, options){', '  return new ReadStream(pin, options);', '}', 'Gpio.createWriteStream = function(pin, options){', '  return new WriteStream(pin, options);', '}', '', 'var rpio2 = {', '  init: rpio.init,', '  rpio: rpio,', '  Gpio: Gpio,', '  ReadStream: ReadStream,', '  WriteStream: WriteStream,', '  GpioGroup: GpioGroup', '}', '', 'require(\'./gpio_util.js\').defineStaticProperties(rpio2);', '', 'module.exports = rpio2;', ''];
_$jscoverage['index.js'][3]++;
const rpio = require('../rpio_sim.js'),
      Gpio = require('./gpio.js'),
      GpioGroup = require('./gpio_group.js'),
      ReadStream = require('./read_stream.js'),
      WriteStream = require('./write_stream.js');

_$jscoverage['index.js'][9]++;
Gpio.createReadStream = function (pin, options) {
  _$jscoverage['index.js'][10]++;

  return new ReadStream(pin, options);
};
_$jscoverage['index.js'][12]++;
Gpio.createWriteStream = function (pin, options) {
  _$jscoverage['index.js'][13]++;

  return new WriteStream(pin, options);
};

_$jscoverage['index.js'][16]++;
var rpio2 = {
  init: rpio.init,
  rpio: rpio,
  Gpio: Gpio,
  ReadStream: ReadStream,
  WriteStream: WriteStream,
  GpioGroup: GpioGroup
};

_$jscoverage['index.js'][25]++;
require('./gpio_util.js').defineStaticProperties(rpio2);

_$jscoverage['index.js'][27]++;
module.exports = rpio2;