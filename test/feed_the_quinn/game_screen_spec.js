describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      level = eskimo.Level,
      Keyboard = eskimo.Keyboard,
      should = require('should'),
      game = require('../../script/feed_the_quinn/game_screen'),
      gameObject = {},
      Daddy = require("../../script/feed_the_quinn/daddy.js"),
      ProgressBar = require("../../script/feed_the_quinn/progress_bar.js"),
      screen;


  afterEach(function() {
    sandbox.restore();
  });

  describe("load", function() {
    var levelLoad;
  
    beforeEach(function() {
      levelLoad = sandbox.stub(level, 'load');
      levelLoad.callsArg(1);
      sandbox.stub(level, 'gameObject', function(key) {
        return gameObject[key];
      });
      var Screen = require('eskimo').Screen;
      var Canvas = require('canvas');
      var canvas = new Canvas(200, 200);
      var $ = require('jquery');

      screen = new Screen($(canvas));
    });

    // Note - should add a test method to the level and say "is this level loaded?"
    it("loads the levelOne on load", function() {
      game.load(screen);

      levelLoad.calledWith('levelOne').should.be.true;
    });

    it("creates the daddy object in the load", function() {
      gameObject['daddy'] = 'daddy object';
      var daddyMock = sandbox.spy(Daddy, 'create');

      game.load(screen);

      daddyMock.calledWith('daddy object').should.be.true;
    });

    it("updates the progress bar with the state of daddy's stress", function() {
      gameObject['progressBar'] = {stress: 0 };
      var fakeDaddy = {
        stress: 40,
        update: sandbox.stub()
      };
      sandbox.stub(Daddy, 'create').returns(fakeDaddy);
      game.load(screen);

      game.update();

      gameObject['progressBar'].stress.should.equal(40);
    });

    it("puts a progress bar on the screen", function() {
      gameObject['progressBar'] = 'progress bar';
      var progressBarMock = sandbox.spy(ProgressBar, 'create');

      game.load(screen);

      var bar = screen.findObjectNamed('progressBar');
      should.exist(bar);
      progressBarMock.calledWith('progressBar', 'progress bar').should.eql(true);
    });

    it("does not do any of these things if the levelLoader doesn't make its callback", function() {
      gameObject['daddy'] = 'daddy object';
      var daddyMock = sandbox.spy(Daddy, 'create');
      gameObject['progressBar'] = 'progress bar';
      var progressBarMock = sandbox.spy(ProgressBar, 'create');
      levelLoad.callArgAt = null;

      game.load(screen);

      daddyMock.called.should.eql(false);
      progressBarMock.called.should.eql(false);
      var bar = screen.findObjectNamed('progressBar');
      should.not.exist(bar);
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
