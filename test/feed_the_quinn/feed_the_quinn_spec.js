describe("FeedTheQuinn", function() {
  var Game = require('../../script/feed_the_quinn/feed_the_quinn'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      should = require('should'),
      machine = { 
        update: function() {
          this.updated = true;
        },
        reset: function() {
          this.updated = false;
        }
      },
      Spies  = require('../spies');

  beforeEach(function() {
    machine.reset();
    Game.screen = 'screen';
  });

  it("initializes the state machine with the screen", function() {
    var stateMachineSpy = Spies.spyOn(StateMachine, 'init', machine);

    Game.update();

    stateMachineSpy.passedArguments()['0'].should.equal('screen');
  });

  it("delegates subsequent updates to initialized the state machine", function() {
    Game.update();

    machine.updated.should.be.true;
  });

});
