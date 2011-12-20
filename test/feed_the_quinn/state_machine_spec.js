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

    sm = StateMachine.init();

    sm.should.be.ok;
  });

  it("begins by loading the title screen state", function() {
    var loadSpy = Spies.spyOn(TitleScreen, "load");

    sm = StateMachine.init();

    loadSpy.wasCalled().should.be.true;
  });

  it("delegates the update method to the current states update", function() {
    Spies.stub(TitleScreen, "load");
    var updateSpy = Spies.spyOn(TitleScreen, "update");

    sm = StateMachine.init();

    sm.update();

    updateSpy.passedArguments().should.eql({'0' : sm});
  });

  it("delegates the draw method to the current states draw", function() {
    var drawSpy = Spies.spyOn(TitleScreen, "draw");

    sm = StateMachine.init();

    sm.draw('screen');

    drawSpy.passedArguments().should.eql({'0' : 'screen'});
  });

  it("delegates the click method to the current states click", function() {
    var clickSpy = Spies.spyOn(TitleScreen, "click");

    sm = StateMachine.init();

    sm.click('event');

    clickSpy.passedArguments().should.eql({'0' : sm, 
                                           '1' : 'event'});
  });

  it("does not delegate to a click method if the currentState doesn't have one", function() {
    var simpleState = {};
    sm = StateMachine.init();

    sm.setState(simpleState);

    sm.click('event');  // Test fails if this throws an exception
  });

});
