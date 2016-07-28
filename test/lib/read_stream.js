'use strict';

global._$jscoverage = global._$jscoverage || {};
_$jscoverage["read_stream.js"] = [];
_$jscoverage["read_stream.js"][3] = 0;
_$jscoverage["read_stream.js"][4] = 0;
_$jscoverage["read_stream.js"][6] = 0;
_$jscoverage["read_stream.js"][8] = 0;
_$jscoverage["read_stream.js"][9] = 0;
_$jscoverage["read_stream.js"][13] = 0;
_$jscoverage["read_stream.js"][14] = 0;
_$jscoverage["read_stream.js"][15] = 0;
_$jscoverage["read_stream.js"][16] = 0;
_$jscoverage["read_stream.js"][19] = 0;
_$jscoverage["read_stream.js"][20] = 0;
_$jscoverage["read_stream.js"][21] = 0;
_$jscoverage["read_stream.js"][24] = 0;
_$jscoverage["read_stream.js"][25] = 0;
_$jscoverage["read_stream.js"][28] = 0;
_$jscoverage["read_stream.js"][30] = 0;
_$jscoverage["read_stream.js"][31] = 0;
_$jscoverage["read_stream.js"][32] = 0;
_$jscoverage["read_stream.js"][33] = 0;
_$jscoverage["read_stream.js"][34] = 0;
_$jscoverage["read_stream.js"][35] = 0;
_$jscoverage["read_stream.js"][36] = 0;
_$jscoverage["read_stream.js"][37] = 0;
_$jscoverage["read_stream.js"][38] = 0;
_$jscoverage["read_stream.js"][39] = 0;
_$jscoverage["read_stream.js"][44] = 0;
_$jscoverage["read_stream.js"][45] = 0;
_$jscoverage["read_stream.js"][46] = 0;
_$jscoverage["read_stream.js"][49] = 0;
_$jscoverage["read_stream.js"].source = ["'use strict';", "", "const Readable = require(\"stream\").Readable;", "const inherits = require(\"util\").inherits;", "", "const Gpio = require('./gpio.js');", "", "function ReadStream(gpio, options){", "  options = Object.assign({", "    mode: Gpio.INPUT", "  }, options);", "", "  if(typeof gpio === 'number'){", "    gpio = new Gpio(gpio);", "    gpio.open(options.mode, options.state);", "    this._autoClose = true;", "  }", "", "  if(options && options.throttle){", "    this.throttle = options.throttle;", "    this.timer = null;", "  }", "", "  Readable.call(this, options);", "  this.gpio = gpio;", "}", "", "inherits(ReadStream, Readable);", "", "ReadStream.prototype._read = function (size) {", "  if(!this.throttle){", "    var buf = this.gpio.read(size);", "    this.push(buf.join(''));", "  }else if(!this.timer){", "    var self = this;", "    this.timer = setTimeout(function(){", "      self.timer = null;", "      self.push(self.gpio.value.toString());", "      self.read(0);", "    }, this.throttle);", "  }", "}", "", "ReadStream.prototype.end = function(){", "  if(this._autoClose) this.gpio.close();", "  this.emit('end');", "}", "", "module.exports = ReadStream;", ""];
_$jscoverage["read_stream.js"][3]++;
const Readable = require("stream").Readable;
_$jscoverage["read_stream.js"][4]++;
const inherits = require("util").inherits;

_$jscoverage["read_stream.js"][6]++;
const Gpio = require('./gpio.js');

_$jscoverage["read_stream.js"][8]++;
function ReadStream(gpio, options) {
  _$jscoverage["read_stream.js"][9]++;

  options = Object.assign({
    mode: Gpio.INPUT
  }, options);

  _$jscoverage["read_stream.js"][13]++;
  if (typeof gpio === 'number') {
    _$jscoverage["read_stream.js"][14]++;

    gpio = new Gpio(gpio);
    _$jscoverage["read_stream.js"][15]++;
    gpio.open(options.mode, options.state);
    _$jscoverage["read_stream.js"][16]++;
    this._autoClose = true;
  }

  _$jscoverage["read_stream.js"][19]++;
  if (options && options.throttle) {
    _$jscoverage["read_stream.js"][20]++;

    this.throttle = options.throttle;
    _$jscoverage["read_stream.js"][21]++;
    this.timer = null;
  }

  _$jscoverage["read_stream.js"][24]++;
  Readable.call(this, options);
  _$jscoverage["read_stream.js"][25]++;
  this.gpio = gpio;
}

_$jscoverage["read_stream.js"][28]++;
inherits(ReadStream, Readable);

_$jscoverage["read_stream.js"][30]++;
ReadStream.prototype._read = function (size) {
  _$jscoverage["read_stream.js"][31]++;

  if (!this.throttle) {
    _$jscoverage["read_stream.js"][32]++;

    var buf = this.gpio.read(size);
    _$jscoverage["read_stream.js"][33]++;
    this.push(buf.join(''));
  } else {
    _$jscoverage["read_stream.js"][34]++;
    if (!this.timer) {
      _$jscoverage["read_stream.js"][35]++;

      var self = this;
      _$jscoverage["read_stream.js"][36]++;
      this.timer = setTimeout(function () {
        _$jscoverage["read_stream.js"][37]++;

        self.timer = null;
        _$jscoverage["read_stream.js"][38]++;
        self.push(self.gpio.value.toString());
        _$jscoverage["read_stream.js"][39]++;
        self.read(0);
      }, this.throttle);
    }
  }
};

_$jscoverage["read_stream.js"][44]++;
ReadStream.prototype.end = function () {
  if (this._autoClose) {
    _$jscoverage["read_stream.js"][45]++;
    this.gpio.close();
  }_$jscoverage["read_stream.js"][46]++;
  this.emit('end');
};

_$jscoverage["read_stream.js"][49]++;
module.exports = ReadStream;