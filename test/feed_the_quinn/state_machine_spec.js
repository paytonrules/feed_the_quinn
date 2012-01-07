describe("StateMachine", function() {
  var StateMachine = require('../../script/feed_the_quinn/state_machine'),
      TitleScreen = require('../../script/feed_the_quinn/title_screen'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      should = require("should"),
      sinon = require("sinon"),
      loadStub;

  beforeEach(function() {
    loadStub = sinon.stub(TitleScreen, "load");
  });

  afterEach(function() {
    loadStub.restore();
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
    var mockScreen = sinon.mock(TitleScreen);
    var sm = StateMachine.init();
    mockScreen.expects("update").once().withArgs(sm);

    sm.update();

    mockScreen.verify();
  });

  it("delegates the draw method to the current states draw", function() {
    var mockScreen = sinon.mock(TitleScreen);
    mockScreen.expects("draw").once().withArgs('screen');

    var sm = StateMachine.init();

    sm.draw('screen');

    mockScreen.verify();
  });

  it("delegates the click method to the current states click", function() {
    var mockScreen = sinon.mock(TitleScreen);
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

  it("loads the first level when the player hits start", function() {
    var sm = StateMachine.init();
    var mockGameScreen = sinon.mock(GameScreen);
    
    mockGameScreen.expects('load').once();

    sm.startGame();

    mockGameScreen.verify();
  });

});
