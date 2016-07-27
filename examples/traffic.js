var GpioGroup = require('../lib/index.js').GpioGroup;
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
