const Gpio = require('../lib/index.js').Gpio;

var gs = Gpio.createReadStream(32, {throttle: 100});

gs.pipe(process.stdout);

process.on("SIGINT", function(){
  gs.end();
  process.exit(0);
});
