describe("StateMachine", function() {
  var sm, 
      assets, 
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      TitleScreen = require('../../script/feed_the_quinn/title_screen'),
      should = require("should"),
      Spies = require("../spies");

  beforeEach(function() {
    assets = 'assets';
  });

  it("returns a state machine object", function() {
    Spies.stub(TitleScreen, "load");

    sm = StateMachine.init('screen');

    sm.should.be.ok;
  });

  it("begins by loading the title screen", function() {
    var loadSpy = Spies.spyOn(TitleScreen, "load");

    sm = StateMachine.init('screen');

    loadSpy.passedArguments()['0'].should.equal('screen');
  });

  it("delegates the update method to the current states update", function() {
    Spies.stub(TitleScreen, "load");
    var updateSpy = Spies.spyOn(TitleScreen, "update");

    sm = StateMachine.init('screen');

    sm.update();

    updateSpy.wasCalled().should.be.true;
  });

});
