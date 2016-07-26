const Gpio = require('../lib/index.js').Gpio;

var input = Gpio.createReadStream(32, {throttle: 100});

var output = Gpio.createWriteStream(40);

input.pipe(output);

process.on("SIGINT", function(){
  input.end();
  output.end();
  process.exit(0);
});

