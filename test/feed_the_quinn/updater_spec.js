describe("FeedTheQuinn#Updater", function() {
  var Updater = require('../../script/feed_the_quinn/updater'),
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
    Updater.screen = 'screen';
  });

  it("initializes the state machine with the screen", function() {
    var stateMachineSpy = Spies.spyOn(StateMachine, 'init', machine);

    Updater.update();

    stateMachineSpy.passedArguments()['0'].should.equal('screen');
  });

  it("delegates subsequent updates to initialized the state machine", function() {
    Updater.update();

    machine.updated.should.be.true;
  });

});
