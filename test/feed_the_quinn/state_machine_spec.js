describe("StateMachine", function() {
  var StateMachine = require('../../script/feed_the_quinn/state_machine'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      Assert = require('assert'),
      sandbox = require("sinon").sandbox.create(),
      sm, options;

  function FirstState(options) {
    this.update = function() {};
    this.moveToSecondState = function() {};
    this.options = options;
    return this;
  };

  function SecondState(options) {
    this.options = options;
    return this;
  };
 
  beforeEach(function() {
    options = {load: sandbox.stub() };
    sm = StateMachine.init([
                            [FirstState, "startGame", SecondState],
                            [FirstState, "doNothing", FirstState],
                            [FirstState, "update", FirstState, "update"],
                            [FirstState, "click", FirstState, "moveToSecondState"],
                            [FirstState, "keydown", SecondState],
                            [SecondState, "keydown", FirstState],
    ], options );
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("returns a state machine object", function() {
    Assert.ok(sm);
  });

  it("begins by loading the first state", function() {
    Assert.equal(sm.currentState().constructor.name, "FirstState");
    Assert.equal(sm.currentState().options, options);
  });

  it("navigates to the next state on a transition", function() {
    sm.startGame();

    Assert.equal(sm.currentState().constructor.name, "SecondState");
    Assert.equal(sm.currentState().options, options);
  })

  it("does not create the state twice if the transition goes to the same place", function() {
    var firstState = sm.currentState();

    sm.doNothing();

    var secondState = sm.currentState();

    Assert.equal(firstState, secondState);
  });

  it("delegates a transition method to the current states update before transitioning", function() {
    var mockState = sandbox.mock(sm.currentState());
    mockState.expects("update").once().withArgs(sm);

    sm.update();

    mockState.verify();
  });

  it("passes along any arguments to the event to the transition method", function() {
    var mockState = sandbox.mock(sm.currentState());
    mockState.expects("update").once().withArgs(sm, 'location');

    sm.update('location');

    mockState.verify();
  });
  
  it("ties each event to its state - two states can have the same event", function() {
    sm.keydown();
    Assert.equal(sm.currentState().constructor, SecondState);

    sm.keydown();
    Assert.equal(sm.currentState().constructor, FirstState);
  });

  it("does not continue with the state transition if the transition action changes the state", function() {
    sandbox.stub(sm.currentState(), "moveToSecondState", function(theState) {
      theState.keydown();
    });

    sm.click();

    Assert.equal(sm.currentState().constructor, SecondState);
  });
});
