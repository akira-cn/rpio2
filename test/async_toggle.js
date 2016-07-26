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
