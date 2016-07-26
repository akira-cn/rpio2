const Gpio = require('../lib/index.js').Gpio;
const gpio = new Gpio(40);

gpio.open(Gpio.OUTPUT);

for(var i = 0; i < 10; i++){
  gpio.sleep(500);
  gpio.toggle();
  gpio.sleep(500);
  gpio.toggle();
}

gpio.close();
