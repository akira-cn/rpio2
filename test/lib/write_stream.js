'use strict';

global._$jscoverage = global._$jscoverage || {};
_$jscoverage["write_stream.js"] = [];
_$jscoverage["write_stream.js"][3] = 0;
_$jscoverage["write_stream.js"][4] = 0;
_$jscoverage["write_stream.js"][6] = 0;
_$jscoverage["write_stream.js"][8] = 0;
_$jscoverage["write_stream.js"][9] = 0;
_$jscoverage["write_stream.js"][13] = 0;
_$jscoverage["write_stream.js"][14] = 0;
_$jscoverage["write_stream.js"][15] = 0;
_$jscoverage["write_stream.js"][16] = 0;
_$jscoverage["write_stream.js"][19] = 0;
_$jscoverage["write_stream.js"][20] = 0;
_$jscoverage["write_stream.js"][23] = 0;
_$jscoverage["write_stream.js"][25] = 0;
_$jscoverage["write_stream.js"][26] = 0;
_$jscoverage["write_stream.js"][27] = 0;
_$jscoverage["write_stream.js"][30] = 0;
_$jscoverage["write_stream.js"][31] = 0;
_$jscoverage["write_stream.js"][32] = 0;
_$jscoverage["write_stream.js"][35] = 0;
_$jscoverage["write_stream.js"].source = ["'use strict';", "", "var Writable = require(\"stream\").Writable;", "var inherits = require(\"util\").inherits;", "", "var Gpio = require(\"./gpio.js\");", "", "function WriteStream(gpio, options) {", "  options = Object.assign({", "    mode: Gpio.OUTPUT", "  }, options);", "", "  if(typeof gpio === 'number'){", "    gpio = new Gpio(gpio);", "    gpio.open(options.mode, options.state);", "    this._autoClose = true;", "  }", "", "  Writable.call(this, options);", "  this.gpio = gpio;", "}", "", "inherits(WriteStream, Writable)", "", "WriteStream.prototype._write = function (chunk, encoding, callback) {", "  this.gpio.write(chunk);", "  callback();", "}", "", "WriteStream.prototype.end = function(){", "  if(this._autoClose) this.gpio.close();", "  Writable.prototype.end.call(this);", "}", "", "module.exports = WriteStream;", ""];
_$jscoverage["write_stream.js"][3]++;
var Writable = require("stream").Writable;
_$jscoverage["write_stream.js"][4]++;
var inherits = require("util").inherits;

_$jscoverage["write_stream.js"][6]++;
var Gpio = require("./gpio.js");

_$jscoverage["write_stream.js"][8]++;
function WriteStream(gpio, options) {
  _$jscoverage["write_stream.js"][9]++;

  options = Object.assign({
    mode: Gpio.OUTPUT
  }, options);

  _$jscoverage["write_stream.js"][13]++;
  if (typeof gpio === 'number') {
    _$jscoverage["write_stream.js"][14]++;

    gpio = new Gpio(gpio);
    _$jscoverage["write_stream.js"][15]++;
    gpio.open(options.mode, options.state);
    _$jscoverage["write_stream.js"][16]++;
    this._autoClose = true;
  }

  _$jscoverage["write_stream.js"][19]++;
  Writable.call(this, options);
  _$jscoverage["write_stream.js"][20]++;
  this.gpio = gpio;
}

_$jscoverage["write_stream.js"][23]++;
inherits(WriteStream, Writable);

_$jscoverage["write_stream.js"][25]++;
WriteStream.prototype._write = function (chunk, encoding, callback) {
  _$jscoverage["write_stream.js"][26]++;

  this.gpio.write(chunk);
  _$jscoverage["write_stream.js"][27]++;
  callback();
};

_$jscoverage["write_stream.js"][30]++;
WriteStream.prototype.end = function () {
  if (this._autoClose) {
    _$jscoverage["write_stream.js"][31]++;
    this.gpio.close();
  }_$jscoverage["write_stream.js"][32]++;
  Writable.prototype.end.call(this);
};

_$jscoverage["write_stream.js"][35]++;
module.exports = WriteStream;