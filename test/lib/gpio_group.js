'use strict';

global._$jscoverage = global._$jscoverage || {};
_$jscoverage['gpio_group.js'] = [];
_$jscoverage['gpio_group.js'][3] = 0;
_$jscoverage['gpio_group.js'][5] = 0;
_$jscoverage['gpio_group.js'][6] = 0;
_$jscoverage['gpio_group.js'][7] = 0;
_$jscoverage['gpio_group.js'][11] = 0;
_$jscoverage['gpio_group.js'][12] = 0;
_$jscoverage['gpio_group.js'][14] = 0;
_$jscoverage['gpio_group.js'][16] = 0;
_$jscoverage['gpio_group.js'][17] = 0;
_$jscoverage['gpio_group.js'][18] = 0;
_$jscoverage['gpio_group.js'][22] = 0;
_$jscoverage['gpio_group.js'][23] = 0;
_$jscoverage['gpio_group.js'][24] = 0;
_$jscoverage['gpio_group.js'][28] = 0;
_$jscoverage['gpio_group.js'][32] = 0;
_$jscoverage['gpio_group.js'][34] = 0;
_$jscoverage['gpio_group.js'][35] = 0;
_$jscoverage['gpio_group.js'][36] = 0;
_$jscoverage['gpio_group.js'][38] = 0;
_$jscoverage['gpio_group.js'][41] = 0;
_$jscoverage['gpio_group.js'][42] = 0;
_$jscoverage['gpio_group.js'][43] = 0;
_$jscoverage['gpio_group.js'][44] = 0;
_$jscoverage['gpio_group.js'][46] = 0;
_$jscoverage['gpio_group.js'][47] = 0;
_$jscoverage['gpio_group.js'][48] = 0;
_$jscoverage['gpio_group.js'][53] = 0;
_$jscoverage['gpio_group.js'].source = ['\'use strict\';', '', 'const Gpio = require(\'./gpio.js\');', '', 'function GpioGroup(pins, activeLow){', '  this.gpios = pins.map(function(pin){', '    return new Gpio(pin, activeLow);', '  });', '}', '', 'GpioGroup.init = Gpio.init;', 'require(\'./gpio_util.js\').defineStaticProperties(GpioGroup);', '', 'Object.assign(GpioGroup.prototype, {', '  open: function(){', '    var args = [].slice.call(arguments);', '    return this.gpios.map(function(gpio){', '      return gpio.open.apply(gpio, args);', '    });', '  },', '  close: function(){', '    var args = [].slice.call(arguments);', '    return this.gpios.map(function(gpio){', '      return gpio.close.apply(gpio, args);', '    });    ', '  },', '  sleep: function(ms){', '    return Gpio.prototype.sleep(ms);', '  }', '});', '', 'Object.defineProperty(GpioGroup.prototype, \'value\', {', '  get: function(){', '    var args = [].slice.call(arguments);', '    var values = this.gpios.map(function(gpio){', '      return gpio.value;', '    });', '    return parseInt(values.join(\'\'), 2);', '  },', '  set: function(value){', '    var len = this.gpios.length;', '    var padStr = new Array(len).join(\'0\');', '    value = (padStr + value.toString(2)).slice(-len);', '    var self = this;', '', '    return value.split(\'\').map(function(val, idx){', '      var gpio = self.gpios[idx];', '      return gpio.value = 0|val;', '    });', '  }', '});', '', 'module.exports = GpioGroup;', ''];
_$jscoverage['gpio_group.js'][3]++;
const Gpio = require('./gpio.js');

_$jscoverage['gpio_group.js'][5]++;
function GpioGroup(pins, activeLow) {
  _$jscoverage['gpio_group.js'][6]++;

  this.gpios = pins.map(function (pin) {
    _$jscoverage['gpio_group.js'][7]++;

    return new Gpio(pin, activeLow);
  });
}

_$jscoverage['gpio_group.js'][11]++;
GpioGroup.init = Gpio.init;
_$jscoverage['gpio_group.js'][12]++;
require('./gpio_util.js').defineStaticProperties(GpioGroup);

_$jscoverage['gpio_group.js'][14]++;
Object.assign(GpioGroup.prototype, {
  open: function () {
    _$jscoverage['gpio_group.js'][16]++;

    var args = [].slice.call(arguments);
    _$jscoverage['gpio_group.js'][17]++;
    return this.gpios.map(function (gpio) {
      _$jscoverage['gpio_group.js'][18]++;

      return gpio.open.apply(gpio, args);
    });
  },
  close: function () {
    _$jscoverage['gpio_group.js'][22]++;

    var args = [].slice.call(arguments);
    _$jscoverage['gpio_group.js'][23]++;
    return this.gpios.map(function (gpio) {
      _$jscoverage['gpio_group.js'][24]++;

      return gpio.close.apply(gpio, args);
    });
  },
  sleep: function (ms) {
    _$jscoverage['gpio_group.js'][28]++;

    return Gpio.prototype.sleep(ms);
  }
});

_$jscoverage['gpio_group.js'][32]++;
Object.defineProperty(GpioGroup.prototype, 'value', {
  get: function () {
    _$jscoverage['gpio_group.js'][34]++;

    var args = [].slice.call(arguments);
    _$jscoverage['gpio_group.js'][35]++;
    var values = this.gpios.map(function (gpio) {
      _$jscoverage['gpio_group.js'][36]++;

      return gpio.value;
    });
    _$jscoverage['gpio_group.js'][38]++;
    return parseInt(values.join(''), 2);
  },
  set: function (value) {
    _$jscoverage['gpio_group.js'][41]++;

    var len = this.gpios.length;
    _$jscoverage['gpio_group.js'][42]++;
    var padStr = new Array(len).join('0');
    _$jscoverage['gpio_group.js'][43]++;
    value = (padStr + value.toString(2)).slice(-len);
    _$jscoverage['gpio_group.js'][44]++;
    var self = this;

    _$jscoverage['gpio_group.js'][46]++;
    return value.split('').map(function (val, idx) {
      _$jscoverage['gpio_group.js'][47]++;

      var gpio = self.gpios[idx];
      _$jscoverage['gpio_group.js'][48]++;
      return gpio.value = 0 | val;
    });
  }
});

_$jscoverage['gpio_group.js'][53]++;
module.exports = GpioGroup;