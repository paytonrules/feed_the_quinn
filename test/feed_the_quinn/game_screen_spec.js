describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      level = eskimo.Level,
      Keyboard = eskimo.Keyboard,
      should = require('should'),
      game = require('../../script/feed_the_quinn/game_screen'),
      gameObject = {},
      Daddy = require("../../script/feed_the_quinn/daddy.js"),
      ProgressBar = require("../../script/feed_the_quinn/progress_bar.js");


  afterEach(function() {
    sandbox.restore();
  });

  describe("load", function() {
    var levelLoad;
  
    beforeEach(function() {
      levelLoad = sandbox.stub(level, 'load');
      sandbox.stub(level, 'gameObject', function(key) {
        return gameObject[key];
      });
               
    });

    // Note - should add a test method to the level and say "is this level loaded?"
    it("loads the levelOne on load", function() {
      game.load();

      levelLoad.calledWith('levelOne').should.be.true;
    });

    it("createes the daddy object in the load", function() {
      gameObject['daddy'] = 'daddy object';
      var daddyMock = sandbox.spy(Daddy, 'create');

      game.load();

      daddyMock.calledWith('daddy object').should.be.true;
    });

    it("creates a progress bar object in the load", function() {
      gameObject['progressBar'] = 'progress bar';
      var progressBarMock = sandbox.spy(ProgressBar, 'create');
      
      game.load();

      progressBarMock.calledWith('progress bar').should.be.true;
    });

    it("updates the progress bar with the state of daddy's stress", function() {
      gameObject['progressBar'] = {stress: 0 };
      var fakeDaddy = {
        stress: 40,
        update: sandbox.stub()
      };
      sandbox.stub(Daddy, 'create').returns(fakeDaddy);
      game.load();

      game.update();

      gameObject['progressBar'].stress.should.equal(40);
    });
  });

  describe("update", function() {
    var daddy,
        daddyMock;
    
    beforeEach(function() {
      daddy = Daddy.create();
      game.setDaddy(daddy);

      daddyMock = sandbox.mock(daddy);
    });

    it("updates the daddy with the keystate when something is pressed", function() {
      daddyMock.expects('update').withArgs({left: true});

      game.keydown({which: Keyboard.LEFT_ARROW});
      game.update();

      daddyMock.verify();
    });

    it("doesnt change the key state until a keyup is sent", function() {
      daddyMock.expects('update').twice().withArgs({left: true});

      game.keydown({which: Keyboard.LEFT_ARROW});
      game.update();
      game.update();

      daddyMock.verify();
    });

    it("Stops moving left on a keyup", function() {
      daddyMock.expects('update').withArgs({left: true});
      daddyMock.expects('update').withArgs({left: false});
      
      game.keydown({which: Keyboard.LEFT_ARROW});
      game.update();
      game.keyup({which: Keyboard.LEFT_ARROW});
      game.update();

      daddyMock.verify();
    });
  });
});
