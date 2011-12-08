describe("FeedTheQuinn", function() {
  var FeedTheQuinn = require('./spec_helper').FeedTheQuinn,
      should = require('should'),
      Spies  = require('./spies');

  it("initializes the state machine with the screen", function() {
    var stateMachineSpy = Spies.spyOn(FeedTheQuinn, "StateMachine");

    new FeedTheQuinn('screen');

    stateMachineSpy.passedArguments()['0'].should.equal('screen');
  });

  it("delegates subsequent updates to the state machine", function() {
    var sm = { 
      update: function() {
        this.updated = true;
      }
    };
    Spies.stub(FeedTheQuinn, "StateMachine", sm);

    var quinn = new FeedTheQuinn('irrelevant');
    quinn.update();

    sm.updated.should.be.true;
  });

});
