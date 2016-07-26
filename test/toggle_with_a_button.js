const Gpio = require('../lib/index.js').Gpio;
const button = new Gpio(32);
const output = new Gpio(40);

button.open(Gpio.INPUT);
output.open(Gpio.OUTPUT, Gpio.LOW);

//button down
button.on('rising', function(obj){
  output.toggle();
});

process.on("SIGINT", function(){
  button.close();
  output.close();

  console.log('shutdown!');
  process.exit(0);
});
