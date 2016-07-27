'use strict';

const rpio = require('../rpio_sim.js');

rpio.POLL_NONE = 0;
rpio.PULL_DEFAULT = -1;
rpio.UNKNOWN = -1;

const props = ['UNKNOWN', 'INPUT', 'OUTPUT', 'PULL_OFF', 'PULL_DOWN', 'PULL_UP', 'PULL_DEFAULT', 'HIGH', 'LOW', 'POLL_NONE', 'POLL_LOW', 'POLL_HIGH', 'POLL_BOTH'];

function defineStaticProperties(obj) {
  props.forEach(function (prop) {
    Object.defineProperty(obj, prop, {
      value: rpio[prop],
      writable: false,
      configurable: false,
      enumerable: true
    });
  });
}

module.exports = {
  defineStaticProperties: defineStaticProperties
};