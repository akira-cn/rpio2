const Gpio = require('../lib/index.js').Gpio;
const gpio = new Gpio(40);

gpio.open(Gpio.OUTPUT);
gpio.write(0b10101); //on
gpio.sleep(1000);

console.log(gpio.value); //1

gpio.write('01010'); //off

gpio.sleep(1000);

console.log(gpio.value); //0
gpio.activeLow = true;
console.log(gpio.value); //1

console.log(gpio.read(5).join(''));

const gpio2 = new Gpio(32);
gpio2.open(Gpio.INPUT);

setInterval(function(){
  console.log(gpio2.read(5).join(''));
},100);

process.on("SIGINT", function(){
  gpio.close();
  gpio2.close();

  console.log('shutdown!');
  process.exit(0);
});

