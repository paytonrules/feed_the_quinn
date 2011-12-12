describe("StateMachine", function() {
  var sm, 
      assets, 
      StateMachine = require("../spec_helper").FeedTheQuinn.StateMachine,
      should = require("should"),
      Spies = require("../spies");

  beforeEach(function() {
    assets = 'assets';
  });

  it("returns a state machine object", function() {
    Spies.stub(FeedTheQuinn.TitleScreen, "load");

    sm = StateMachine('screen');

    sm.should.be.ok;
  });

  it("begins by loading the title screen", function() {
    var loadSpy = Spies.spyOn(FeedTheQuinn.TitleScreen, "load");

    sm = StateMachine('screen');

    loadSpy.passedArguments()['0'].should.equal('screen');
  });

  it("delegates the update method to the current states update", function() {
    Spies.stub(FeedTheQuinn.TitleScreen, "load");
    var updateSpy = Spies.spyOn(FeedTheQuinn.TitleScreen, "update");

    sm = StateMachine('screen');

    sm.update();

    updateSpy.wasCalled().should.be.true;
  });

});
