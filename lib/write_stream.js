'use strict';

var Writable = require("stream").Writable;
var inherits = require("util").inherits;

var Gpio = require("./gpio.js");

function WriteStream(gpio, options) {
  options = Object.assign({
    mode: Gpio.OUTPUT
  }, options);

  if(typeof gpio === 'number'){
    gpio = new Gpio(gpio);
    gpio.open(options.mode, options.state);
    this._autoClose = true;
  }

  Writable.call(this, options);
  this.gpio = gpio;
}

inherits(WriteStream, Writable)

WriteStream.prototype._write = function (chunk, encoding, callback) {
  this.gpio.write(chunk);
  callback();
}

WriteStream.prototype.end = function(){
  if(this._autoClose) this.gpio.close();
  Writable.prototype.end.call(this);
}

module.exports = WriteStream;
