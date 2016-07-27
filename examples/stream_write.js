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

