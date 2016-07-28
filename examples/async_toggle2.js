const wait = require('wait-promise');
const Gpio = require('../lib/index.js').Gpio;

var gpio = new Gpio(40);
gpio.open(Gpio.OUTPUT);

wait.every(500).and(function(){
  //forever - never return true
  gpio.toggle();

}).forward();

process.on("SIGINT", function(){
  gpio.close();

  console.log('shutdown!');
  process.exit(0);
});
