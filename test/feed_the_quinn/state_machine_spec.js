describe("StateMachine", function() {
  var StateMachine = require('../../script/feed_the_quinn/state_machine'),
      TitleScreen = require('../../script/feed_the_quinn/title_screen'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      should = require("should"),
      sandbox = require("sinon").sandbox.create(),
      loadStub;

  beforeEach(function() {
    loadStub = sandbox.stub(TitleScreen, "load");
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("returns a state machine object", function() {
    var sm = StateMachine.init();

    sm.should.be.ok;
  });

  it("begins by loading the title screen state", function() {
    var sm = StateMachine.init();

    loadStub.called.should.be.true;
  });

  it("delegates the update method to the current states update", function() {
    var mockScreen = sandbox.mock(TitleScreen);
    var sm = StateMachine.init();
    mockScreen.expects("update").once().withArgs(sm);

    sm.update();

    mockScreen.verify();
  });

  it("delegates the click method to the current states click", function() {
    var mockScreen = sandbox.mock(TitleScreen);
    var sm = StateMachine.init();
    mockScreen.expects("click").once().withArgs(sm, 'location');

    sm.click('location');

    mockScreen.verify();
  });

  it("does not delegate to a click method if the currentState doesn't have one", function() {
    var simpleState = {};
    var sm = StateMachine.init();

    sm.setState(simpleState);

    sm.click('event');  // Test fails if this throws an exception
  });

  it("loads the gameScreen when the player hits start", function() {
    var sm = StateMachine.init();
    var mockGameScreen = sandbox.mock(GameScreen);
    
    mockGameScreen.expects('load').once();

    sm.startGame();

    mockGameScreen.verify();
  });

  it("sets the current state to be the gameScreen on startGame", function() {
    var sm = StateMachine.init();
    sandbox.stub(GameScreen, 'load');

    sm.startGame();

    sm.currentState().should.eql(require('../../script/feed_the_quinn/game_screen'));
  });

  it("delegates the keydown event to the current state", function() {
    var sm = StateMachine.init();
    var stateWithKeydown = {keydown: sandbox.spy()}

    sm.setState(stateWithKeydown);

    sm.keydown({which: 3});

    stateWithKeydown.keydown.calledWith({which: 3}).should.be.true;
  });

  it("does not throw an exception when the keydown wasn't defined", function() {
    var sm = StateMachine.init();
    var stateWithoutKeydown = {};

    sm.setState(stateWithoutKeydown);

    sm.keydown({which: 3});
  });
});
