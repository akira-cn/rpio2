'use strict';

const fs = require('fs');

var pin = 0|process.argv[2];
var timers = process.argv[3].split(',').map(o => 0|o);
var fileName = './test/gpio/gpio' + pin;


function writeAndWait(value, time){
  fs.writeFileSync(fileName, new Buffer([value]));
  return new Promise(function(resolve){
    setTimeout(resolve, time);
  });
}

var p = Promise.resolve();

for(var i = 0; i < timers.length; i += 2){
  p = p.then(((i) => () => writeAndWait(timers[i], timers[i + 1]))(i));
}

p.then(function(){
  var content = fs.readFileSync(fileName);
  console.log(content);
}).catch(err => console.log(err));


