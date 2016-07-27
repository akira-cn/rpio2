module.exports = function(babel) {
  var t = babel.types;

  return {visitor: {
    CallExpression: function(path){
      if(path.node.callee.name === 'require'){
        var module = path.node.arguments[0];
        if(module && module.value === 'rpio'){
          module.value = '../rpio_sim.js';
        }
      }
    }
  }}; 
};
