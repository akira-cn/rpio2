# rpio2

[![npm status](https://img.shields.io/npm/v/rpio2.svg)](https://www.npmjs.org/package/rpio2)
[![build status](https://api.travis-ci.org/akira-cn/rpio2.svg?branch=master)](https://travis-ci.org/akira-cn/rpio2) 
[![dependency status](https://david-dm.org/akira-cn/rpio2.svg)](https://david-dm.org/akira-cn/rpio2) 
[![coverage status](https://img.shields.io/coveralls/akira-cn/rpio2.svg)](https://coveralls.io/github/akira-cn/rpio2)

Export elegant OOP APIs to control Raspberry Pi GPIO pins with Node.js. Based on [node-rpio](https://github.com/jperkin/node-rpio) which is a high performace library.

## Installation

```bash
npm install rpio2 --production
```

By default the module will use `/dev/gpiomem` when using simple GPIO access.
To access this device, your user will need to be a member of the `gpio` group,
and you may need to configure udev with the following rule (as root):

```console
$ cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF
```

For access to i²c, PWM, and SPI, or if you are running an older kernel which
does not have the `bcm2835-gpiomem` module, you will need to run your programs
as root for access to `/dev/mem`.

## Usage

**Synchronously**

```js
const Gpio = require('./lib/index.js').Gpio;
const gpio = new Gpio(40);

gpio.open(Gpio.OUTPUT);

for(var i = 0; i < 10; i++){
	gpio.toggle();
	gpio.sleep(500);
}

gpio.close();
```

**Asynchronously**

```js
const Gpio = require('../lib/index.js').Gpio;
const gpio = new Gpio(40);

gpio.open(Gpio.OUTPUT);

void function loop(){
  Promise.resolve(gpio.toggle())
  .then(gpio.sleep.bind(null, 500, true))
  .then(loop)
}();

process.on("SIGINT", function(){
  gpio.close();

  console.log('shutdown!');
  process.exit(0);
});
```

**Toggle with button**

```js
const Gpio = require('../lib/index.js').Gpio;
const button = new Gpio(32);
const output = new Gpio(40);

button.open(Gpio.INPUT);
output.open(Gpio.OUTPUT, Gpio.LOW);

//button down
button.on('rising', function(){
  output.toggle();
});

process.on("SIGINT", function(){
  button.close();
  output.close();

  console.log('shutdown!');
  process.exit(0);
});
```

## API

### Class Gpio extends [events.EventEmitter](https://nodejs.org/dist/latest-v4.x/docs/api/events.html#events_class_eventemitter)

#### Methods

  * [Gpio(pin[, activeLow]) - Constructor](#gpiopin-activelow)
  * [open(mode[, state]) - Export the GPIO to userspace](#openmode-state)
  * [close() - Unexport the GPIO](#close)
  * [read() - Get GPIO value](#read)
  * [write(value) - Set GPIO value](#writevalue)
  * [toggle() - Change GPIO value](#toggle)
  * [sleep(ms[,async]) - Sleep for a few milliseconds](#sleepmsasync)
  * [createReadStream(pin[, options]) - Create a readable stream from a pin](#createreadstreampin-options)
  * [createWriteStream(pin[, options]) - Create a writable stream for a pin](#createwritestreampin-options)
  * [group(pins[, activeLow]) - Create a group of GPIOs](#grouppins-activelow)
  
#### Statics

  * [Gpio.init(options) - initialize GPIO's global settings](#gpioinitoptions)
  * [Gpio.sleep(ms) - Sleep for a few milliseconds](#gpiosleepms)

#### Properties

  * [value:0|1 - Set/Get GPIO value](#value01)
  * [state:0|1|2 - Set/Get GPIO state](#state01)
  * [mode:0|1 - Set/Get GPIO input/output direction](#mode01)
  * [activeLow:boolean - GPIO activeLow setting](#activelow-boolean)

#### Events

  * [rising - Triggering an event when GPIO signal `rising`](#eventrising)
  * [falling - Triggering an event when GPIO signal `falling`](#eventfalling)
  * [change - Triggering an event when GPIO signal `rising` or `falling`](#eventchange)

#### Constants
  
  - Gpio.UNKNOWN = -1;
  - Gpio.HIGH = 1;
  - Gpio.LOW = 0;
  - Gpio.INPUT = 0;
  - Gpio.OUTPUT = 1;
  - Gpio.PULL_OFF = 0;
  - Gpio.PULL_DOWN = 1;
  - Gpio.PULL_UP = 2;
  - Gpio.PULL_DEFAULT = -1;
  - Gpio.POLL_NONE = 0;
  - Gpio.POLL_LOW = 1;
  - Gpio.POLL_HIGH = 2;
  - Gpio.POLL_BOTH = 3;

### Class GpioGroup

  * [GpioGroup(pins[, activeLow]) - Constructor](#gpiogrouppins-activelow)

---

##### Gpio(pin[,activeLow])

`new Gpio(pin[,activeLow])` creates a GPIO pin instance. The arguments `pin` use the  physical numbering (P01-P40) by default:

```
let pin1 = new Gpio(40); //create P40 (gpio21)
```

The option parameter `activeLow` specifies whether the values read from or written to the GPIO should be inverted. The interrupt generating edge for the GPIO also follow this setting. The valid values for activeLow are true and false. Setting activeLow to true inverts. The default value is false.

The pin number mapping to GPIO number as below (Pi2 B+):

<table>
  <tr>
    <td>+ 3.3v</td><td>1</td><td>2</td><td>+ 5v</td></tr>
  <tr>
    <td>I2C SDA / <em>GPIO 2</em></td><td>3</td><td >
      4</td><td>+ 5v</td></tr>
  <tr>
    <td>I2C SCL / <em>GPIO 3</em></td><td>5</td><td>6</td><td>Ground</td></tr>
  <tr>
    <td>Clock / <em>GPIO 4</em></td><td>7</td><td>8</td><td>TX / <em>GPIO 14</em></td></tr>
  <tr>
    <td>--</td><td>9</td><td>10</td><td>RX / <em>GPIO 15</em></td></tr>
  <tr>
    <td><em>GPIO 17</em></td><td>11</td><td>12</td><td><em>GPIO 18</em></td></tr>
  <tr>
    <td><em>GPIO 27</em></td><td>13</td><td>14</td><td>--</td></tr>
  <tr>
    <td><em>GPIO 22</em></td><td>15</td><td>16</td><td><em>GPIO 23</em></td></tr>
  <tr>
    <td>+ 3.3V</td><td>17</td><td>18</td><td><em>GPIO 24</em></td></tr>
  <tr>
    <td>SPI MOSI / <em>GPIO 10</em></td><td>19</td><td>20</td><td>--</td></tr>
  <tr>
    <td>SPI MISO / <em>GPIO 9</em></td><td>21</td><td>22</td><td><em>GPIO 25</em></td></tr>
  <tr>
    <td>SPI SCLK / <em>GPIO 11</em></td><td>23</td><td>24</td><td>SPI CE0 / <em>GPIO 8</em></td></tr>
  <tr>
    <td>--</td><td>25</td><td>26</td><td>SPI CE1 / <em>GPIO 7</em></td></tr>
  <tr>
    <td colspan="4">Model A+ and Model B+ additional pins</td></tr>
  <tr>
    <td>ID_SD</td><td>27</td><td>28</td><td>ID_SC</td></tr>
  <tr>
    <td><em>GPIO 5</em></td><td>29</td><td>30</td><td>--</td></tr>
  <tr>
    <td><em>GPIO 6</em></td><td>31</td><td>32</td><td><em>GPIO 12</em></td></tr>
  <tr>
    <td><em>GPIO 13</em></td><td>33</td><td>34</td><td>--</td></tr>
  <tr>
    <td><em>GPIO 19</em></td><td>35</td><td>36</td><td><em>GPIO 16</em></td></tr>
  <tr>
    <td><em>GPIO 26</em></td><td>37</td><td>38</td><td><em>GPIO 20</em></td></tr>
  <tr>
    <td>--</td><td>39</td><td>40</td><td><em>GPIO 21</em></td></tr>
</table>

If you want to map to gpio number directly, see [Gpio.init(options)](#gpioinitoptions)

---

### Methods

##### open(mode[, state])

Open a pin for input or output. Valid modes are:

- Gpio.INPUT: pin is input (read-only).
- Gpio.OUTPUT: pin is output (read-write).

For output pins, the second parameter defines the initial value of the pin, rather than having to issue a separate .write() call. This can be critical for devices which must have a stable value, rather than relying on the initial floating value when a pin is enabled for output but hasn't yet been configured with a value.

For input pins, the second parameter can be used to configure the internal pullup or pulldown resistors state, see [mode:0|1](#mode01) [state:0|1](#state01) for more details.

##### close()

Unexports a GPIO from userspace and release all resources.

##### read()

Set a velue to a GPIO.

##### write(value) 

Set a velue to a GPIO.

##### toggle()

Change GPIO value.

##### sleep(ms[,async])

Sleep for a few milliseconds. If async is `true`, it will return a promise.

##### createReadStream(pin[, options])

Experimental. See the following example:

**log input value to stdout**

```js
const Gpio = require('../lib/index.js').Gpio;

var gs = Gpio.createReadStream(32, {throttle: 100});

gs.pipe(process.stdout);

process.on("SIGINT", function(){
  gs.end();
  process.exit(0);
});
```

##### createWriteStream(pin[, options])

Experimental. See the following example:

**read from stdin and set value**

```js
const Gpio = require('../lib/index.js').Gpio;

var gs = Gpio.createWriteStream(40, {
  mode: Gpio.OUTPUT,
  state: Gpio.HIGH
});

console.log('Please input value of P40.');

process.stdin.pipe(gs);

process.on("SIGINT", function(){
  gs.end();
  process.exit(0);
});
```

**trace input/output pins**

```js
const Gpio = require('../lib/index.js').Gpio;

var input = Gpio.createReadStream(32, {throttle: 100});

var output = Gpio.createWriteStream(40);

input.pipe(output);

process.on("SIGINT", function(){
  input.end();
  output.end();
  process.exit(0);
});
```

##### group(pins[, activeLow])

Create GpioGroup instance. See [GpioGroup(pins[, activeLow]) - Constructor](#gpiogrouppins-activelow).

---

### Properties

##### value:0|1

Get or set a velue to a GPIO **synchronously**.

##### mode:0|1

The pin direction, pass either Gpio.INPUT for read mode or Gpio.OUTPUT for write mode.

##### state:0|1

The pin state. For input pins, state can be either Gpio.POLL\_HIGHT or Gpio.POLL\_LOW. For output pins, it is equivalent to `value` that state can be either Gpio.HIGH or Gpio.LOW. 

##### activeLow: boolean

Specifies whether the values read from or written to the GPIO should be inverted. The interrupt generating edge for the GPIO also follow this this setting. The valid values for activeLow are true and false. Setting activeLow to true inverts. The default value is false.

---

### Statics

##### Gpio.init([options])

Initialise the bcm2835 library.  This will be called automatically by `.open()`
using the default option values if not called explicitly.  The default values
are:

```js
var options = {
        gpiomem: true,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
}
```

##### `gpiomem`

There are two device nodes for GPIO access.  The default is `/dev/gpiomem`
which, when configured with `gpio` group access, allows users in that group to
read/write directly to that device.  This removes the need to run as root, but
is limited to GPIO functions.

For non-GPIO functions (i²c, PWM, SPI) the `/dev/mem` device is required for
full access to the Broadcom peripheral address range and the program needs to
be executed as the root user (e.g. via sudo).  If you do not explicitly call
`.init()` when using those functions, the library will do it for you with
`gpiomem: false`.

You may also need to use `gpiomem: false` if you are running on an older Linux
kernel which does not support the `gpiomem` module.

rpio will throw an exception if you try to use one of the non-GPIO functions
after already opening with `/dev/gpiomem`, as well as checking to see if you
have the necessary permissions.

Valid options:

* `true`: use `/dev/gpiomem` for non-root but GPIO-only access
* `false`: use `/dev/mem` for full access but requires root

##### `mapping`

There are two naming schemes when referring to GPIO pins:

* By their physical header location: Pins 1 to 26 (A/B) or Pins 1 to 40 (A+/B+)
* Using the Broadcom hardware map: GPIO 0-25 (B rev1), GPIO 2-27 (A/B rev2, A+/B+)

Confusingly however, the Broadcom GPIO map changes between revisions, so for
example P3 maps to GPIO0 on Model B Revision 1 models, but maps to GPIO2 on all
later models.

This means the only sane default mapping is the physical layout, so that the
same code will work on all models regardless of the underlying GPIO mapping.

If you prefer to use the Broadcom GPIO scheme for whatever reason (e.g. to use
the P5 header pins on the Raspberry Pi 1 revision 2.0 model which aren't
currently mapped to the physical layout), you can set `mapping` to `gpio` to
switch to the GPIOxx naming.

Valid options:

* `gpio`: use the Broadcom GPIOxx naming
* `physical`: use the physical P01-P40 header layout

##### Gpio.sleep(ms[,async])

Sleep for a few milliseconds. If async is `true`, it will return a promise.

---

### Events

If a pin is in direction of Gpio.DIR_IN. Three type of events can be fired when needed.

##### event:rising

When register listener to `rising` event [the rising interrupt edges](https://www.raspberrypi.org/documentation/hardware/raspberrypi/gpio/README.md) should be configured implictly and the GPIO will trigger the `rising` event.

```js
gpio.on('rising', function(){
  console.log('A rising signal detected!');
});
```

##### event:falling

When register listener to `falling` event [the falling interrupt edges](https://www.raspberrypi.org/documentation/hardware/raspberrypi/gpio/README.md) should be configured implictly and the GPIO will trigger the `falling` event.

##### event:change

When register listener to `change` event [the both(rising and falling) interrupt edges](https://www.raspberrypi.org/documentation/hardware/raspberrypi/gpio/README.md) should be configured implictly and the GPIO will trigger the `change` event(on both rising and falling edges).

##### Note:

Registering events to rising and falling will implictly change the interrupt edges as well as unregistering events:

```js
let gpio = new Gpio(40);
gpio.open(Gpio.INPUT);
assertEqual(gpio.edge, Gpio.POLL_NONE); 
gpio.on('rising', function(){...});
assertEqual(gpio.edge, Gpio.POLL_HIGH); 
gpio.on('falling', function(){...});
assertEqual(gpio.edge, Gpio.POLL_BOTH);
gpio.removeListener('rising');
assertEqual(gpio.edge, Gpio.POLL_LOW);
gpio.removeListener('falling'); 
assertEqual(gpio.edge, Gpio.POLL_NONE);
``` 

---
##### GpioGroup(pins, activeLow)

Experimental. See the following example:

```js
var GpioGroup = require('./lib/index.js').GpioGroup;
var pins = [32, 40, 33]; //RGB
var group = new GpioGroup(pins, true);
group.open(GpioGroup.OUTPUT);

var color = {
  yellow: 0b110,
  red: 0b100,
  green: 0b010
};

function turn(color){
  return new Promise(function(resolve, reject) {
   group.value = color;
    resolve();
  })
}
function wait(time){
  return new Promise(function(resolve, reject) {
    setTimeout(resolve,time);
  })
}

void function (){
    turn(color.green)
    .then(wait.bind(null, 5000))
    .then(turn.bind(null, color.yellow))
    .then(wait.bind(null, 2000))
    .then(turn.bind(null, color.red))
    .then(wait.bind(null, 5000))
    .then(arguments.callee)
}();

process.on("SIGINT", function(){
  group.close();

  console.log('shutdown!');
  process.exit(0);
});
```

## LICENSE

GPL

