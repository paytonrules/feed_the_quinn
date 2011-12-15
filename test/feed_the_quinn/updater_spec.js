describe("FeedTheQuinn#Updater", function() {
  var Updater = require('../../script/feed_the_quinn/updater'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      should = require('should'),
      Spies  = require('../spies');

  it("initializes the state machine with the screen", function() {
    var stateMachineSpy = Spies.spyOn(StateMachine, 'init');

    new Updater('screen');

    stateMachineSpy.passedArguments()['0'].should.equal('screen');
  });

  it("delegates subsequent updates to initialized the state machine", function() {
    var sm = { 
      update: function() {
        this.updated = true;
      }
    };
    Spies.stub(StateMachine, "init", sm);

    var quinn = new Updater('irrelevant');
    quinn.update();

    sm.updated.should.be.true;
  });

});
