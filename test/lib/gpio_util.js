'use strict';

global._$jscoverage = global._$jscoverage || {};
_$jscoverage['gpio_util.js'] = [];
_$jscoverage['gpio_util.js'][3] = 0;
_$jscoverage['gpio_util.js'][5] = 0;
_$jscoverage['gpio_util.js'][6] = 0;
_$jscoverage['gpio_util.js'][7] = 0;
_$jscoverage['gpio_util.js'][9] = 0;
_$jscoverage['gpio_util.js'][16] = 0;
_$jscoverage['gpio_util.js'][17] = 0;
_$jscoverage['gpio_util.js'][18] = 0;
_$jscoverage['gpio_util.js'][27] = 0;
_$jscoverage['gpio_util.js'].source = ['\'use strict\';', '', 'const rpio = require(\'rpio\');', '', 'rpio.POLL_NONE = 0;', 'rpio.PULL_DEFAULT = -1;', 'rpio.UNKNOWN = -1;', '', 'const props = [', '  \'UNKNOWN\',\'INPUT\',\'OUTPUT\',', '  \'PULL_OFF\',\'PULL_DOWN\',\'PULL_UP\',\'PULL_DEFAULT\',', '  \'HIGH\',\'LOW\',', '  \'POLL_NONE\',\'POLL_LOW\',\'POLL_HIGH\',\'POLL_BOTH\'', '];', '', 'function defineStaticProperties(obj){', '  props.forEach(function(prop){', '    Object.defineProperty(obj, prop, {', '      value: rpio[prop],', '      writable: false,', '      configurable: false,', '      enumerable: true', '    });', '  });', '}', '', 'module.exports = {', '  defineStaticProperties: defineStaticProperties', '}', ''];
_$jscoverage['gpio_util.js'][3]++;
const rpio = require('../rpio_sim.js');

_$jscoverage['gpio_util.js'][5]++;
rpio.POLL_NONE = 0;
_$jscoverage['gpio_util.js'][6]++;
rpio.PULL_DEFAULT = -1;
_$jscoverage['gpio_util.js'][7]++;
rpio.UNKNOWN = -1;

_$jscoverage['gpio_util.js'][9]++;
const props = ['UNKNOWN', 'INPUT', 'OUTPUT', 'PULL_OFF', 'PULL_DOWN', 'PULL_UP', 'PULL_DEFAULT', 'HIGH', 'LOW', 'POLL_NONE', 'POLL_LOW', 'POLL_HIGH', 'POLL_BOTH'];

_$jscoverage['gpio_util.js'][16]++;
function defineStaticProperties(obj) {
  _$jscoverage['gpio_util.js'][17]++;

  props.forEach(function (prop) {
    _$jscoverage['gpio_util.js'][18]++;

    Object.defineProperty(obj, prop, {
      value: rpio[prop],
      writable: false,
      configurable: false,
      enumerable: true
    });
  });
}

_$jscoverage['gpio_util.js'][27]++;
module.exports = {
  defineStaticProperties: defineStaticProperties
};