'use strict';

const Readable = require("stream").Readable;
const inherits = require("util").inherits;

const Gpio = require('./gpio.js');

function ReadStream(gpio, options){
  options = Object.assign({
    mode: Gpio.INPUT
  }, options);

  if(typeof gpio === 'number'){
    gpio = new Gpio(gpio);
    gpio.open(options.mode, options.state);
    this._autoClose = true;
  }

  if(options && options.throttle){
    this.throttle = options.throttle;
    this.timer = null;
  }

  Readable.call(this, options);
  this.gpio = gpio;
}

inherits(ReadStream, Readable);

ReadStream.prototype._read = function (size) {
  if(!this.throttle){
    var buf = this.gpio.read(size);
    this.push(buf.join(''));
  }else if(!this.timer){
    var self = this;
    this.timer = setTimeout(function(){
      self.timer = null;
      self.push(self.gpio.value.toString());
      self.read(0);
    }, this.throttle);
  }
}

ReadStream.prototype.end = function(){
  if(this._autoClose) this.gpio.close();
  this.emit('end');
}

module.exports = ReadStream;
