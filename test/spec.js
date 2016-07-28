const expect = require('chai').expect;
const rpio2 = require('./lib/index');
const cluster = require('cluster');
const wait = require('wait-promise');

describe('rpio2 tests', function(){
  this.timeout(10000);
  var rpio = rpio2.rpio;
  var Gpio = rpio2.Gpio;

  describe('rpio tests', function(){
    it('test rpio sim', function(){

      //console.log(rpio2.rpio);
      var gpio = rpio.open(40, rpio.INPUT);
      expect(rpio.read(40)).to.equal(0);
      gpio = rpio.open(3, rpio.INPUT);
      expect(rpio.read(3)).to.equal(1);
      var foo =  function(){
        rpio.write(3, 0);
      };
      expect(foo).to.throw(Error);
      rpio.close(3);

      var gpio = rpio.open(3, rpio.OUTPUT);
      expect(rpio.read(3)).to.equal(0);
      rpio.write(3, 1);
      expect(rpio.read(3)).to.equal(1);
      rpio.close(3);

      //simulate input signals
      rpio.helper(40, [1,200,0]).then( 
        function(res){
          expect(rpio.read(40)).to.equal(0);
        });

      return wait.after(1000).and(function(){
        rpio.close(40);
      }).check(()=>true);
    });

    it('test rpio sim 2', function(){
      var gpio = rpio.open(40, rpio.INPUT);
      expect(()=>rpio.write(40,0)).to.throw(Error);
      rpio.mode(40, rpio.OUTPUT);
      rpio.write(40, 1)
      expect(rpio.read(40)).to.equal(1);
      rpio.close(40);
    });

    it('test rpio sim 3', function(cb){
      rpio.open(32, rpio.INPUT);
      
      rpio.poll(32, function(pin){
        //console.log('changed:' + pin);
        expect(rpio.read(pin)).to.equal(1);
      }, rpio.POLL_BOTH);

      rpio.helper(32, [0,100,1]).then(function(res){
        rpio.close(32);
        cb();
      }).catch(err=>console.log(err));
    });

    it('test rpio sim 4', function(){
      var t = Date.now();
      rpio.msleep(500);
      expect(Date.now() - t).to.be.above(499);
    });

    it('test rpio sim 5', function(){
      var gpio = rpio.open(40, rpio.OUTPUT);
      var buff = new Buffer(10);
      rpio.readbuf(40, buff);
      expect(buff.join('')).to.equal('0000000000');
      buff[4] = 1;
      rpio.writebuf(40, buff, 5);
      expect(rpio.read(40)).to.equal(1);
      rpio.close(40);
    });
  });

  describe('Gpio tests', function(){
    it('sync toggle', function(){
      const gpio = new Gpio(40);

      gpio.open(Gpio.OUTPUT, Gpio.LOW);

      for(var i = 0; i < 10; i++){
        gpio.sleep(50);
        expect(i % 2).to.equal(gpio.value);
        gpio.toggle();
      }

      gpio.close();
    });
    it('async toggle', function(done){
      const gpio = new Gpio(40);

      gpio.open(Gpio.OUTPUT, Gpio.LOW);

      var i = 0;

      void function loop(){
        Promise.resolve(gpio.toggle())
        .then(gpio.sleep.bind(null, 50, true))
        .then(function(){
          expect(i % 2).to.equal(1 ^ gpio.value);
          if(i++ < 10) loop();
          else {
            gpio.close();
            done();
          }
        })
      }();
    });
    it('async toggle 2', function(done){
      var gpio = new Gpio(40);
      gpio.open(Gpio.OUTPUT);

      wait.every(50).limit(10).and(function(i){
        expect(i % 2).to.equal(gpio.value);
        gpio.toggle();

      }).forward().catch(function(){
        gpio.close(40);
        done();
      });     
    });

    it('read pin', function(done){
      var input = new Gpio(40);
      input.open(Gpio.INPUT);
      
      var values = [];

      rpio.helper(40, [0,100,1,100,0,100,1,100,0,100,1,100,0,100,1])
        .then(function(){
          expect(values.join('')).to.equal('01010');
          input.close();
          done();
        });

      wait.after(90).every(100).limit(5).and(function(){
        values.push(input.value)
      }).forward();
    });

    it('events', function(done){
      var input = new Gpio(32);
      input.open(Gpio.INPUT);
      
      setTimeout(function(){
        rpio.helper(32, [0, 100,1,100,0,100,1,100,0])
          .then(function(){
            expect(rCount).to.equal(2);
            expect(fCount).to.equal(2);
            input.close();
            done();
          }).catch(err=>console.log(err));
      }, 200);

      var rCount = 0, fCount = 0;
      input.on('rising', function(pin){
        //console.log('rising', input.value);
        expect(pin.value).to.equal(1);
        rCount++;
      });
      
      input.on('falling', function(pin){
        //console.log('falling', input.value);
        expect(pin.value).to.equal(0);
        fCount++;
      });
    });

  });
});