describe("StateMachine", function() {
  var StateMachine = require('../../script/feed_the_quinn/state_machine'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      Assert = require('assert'),
      sandbox = require("sinon").sandbox.create();

  it("returns a state machine object", function() {
    var sm = StateMachine.init();
    
    Assert.ok(sm);
  });

  it("begins by loading the title screen state", function() {
    var sm = StateMachine.init('spec', 'screen');

    Assert.equal(sm.currentState().constructor.name, "TitleScreen");
  });

  it("delegates the update method to the current states update", function() {
    var sm = StateMachine.init();
    var mockState = sandbox.mock(sm.currentState());
    mockState.expects("update").once().withArgs(sm);

    sm.update();

    mockState.verify();
  });

  it("delegates the click method to the current states click", function() {
    var sm = StateMachine.init();
    var mockState = sandbox.mock(sm.currentState());
    mockState.expects("click").once().withArgs(sm, 'location');

    sm.click('location');

    mockState.verify();
  });

  it("does not delegate to a click method if the currentState doesn't have one", function() {
    var simpleState = {};
    var sm = StateMachine.init();

    sm.setState(simpleState);

    try {
      sm.click('event');
    } catch(e) {
      Assert.fail("Threw exception we didn't expect: " + e.message);
    }
  });

  it("creates the GameScreen when the player hits start", function() {
    var sm = StateMachine.init('spec', 'screen');

    sm.startGame();

    Assert.equal(sm.currentState().constructor.name, "GameScreen");
  });

  it("delegates the keydown event to the current state", function() {
    var sm = StateMachine.init();
    var stateWithKeydown = {keydown: sandbox.spy()};

    sm.setState(stateWithKeydown);

    sm.keydown({which: 3});

    Assert.ok(stateWithKeydown.keydown.calledWith({which: 3}));
  });

  it("delegates the keyup event to the current state", function() {
    var sm = StateMachine.init();
    var stateWithKeyup = {keyup: sandbox.spy()};

    sm.setState(stateWithKeyup);

    sm.keyup({which: 3});

    Assert.ok(stateWithKeyup.keyup.calledWith({which: 3}));
  });

  it("does not throw an exception when the keydown wasn't defined", function() {
    var sm = StateMachine.init();
    var stateWithoutKeydown = {};

    sm.setState(stateWithoutKeydown);

    sm.keydown({which: 3});
  });

  it("does not throw an exception when the keyup wasn't defined", function() {
    var sm = StateMachine.init();
    var stateWithoutKeyup = {};

    sm.setState(stateWithoutKeyup);

    sm.keyup({which: 3});
  });
});
