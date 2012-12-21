describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      Keyboard = eskimo.Keyboard,
      Assert = require('assert'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      Daddy = require("../../script/feed_the_quinn/daddy.js"),
      ProgressBar = require("../../script/feed_the_quinn/progress_bar.js"),
      FedQuinnChecker = require("../../script/feed_the_quinn/quinn_status.js"),
      TestGameSpecFactory = require('eskimo').TestGameSpecFactory,
      level = { 
        "levelOne" : {
          "object" : "levelOneObject",
          "daddy" : "daddy object",
          "progressBar" : "progress bar object"
        }
      },
      gameSpec,
      screen;

  describe("construction", function() {
    afterEach(function() {
      sandbox.restore();
    });

    beforeEach(function() {
      gameSpec = TestGameSpecFactory.create(level);
      var Screen = require('eskimo').Screen;
      var Canvas = require('canvas');
      var canvas = new Canvas(200, 200);
      var $ = require('jquery');

      screen = new Screen($(canvas));
    });

    it("loads the levelOne on load", function() {
      new GameScreen(gameSpec, screen);
      
      Assert.equal(gameSpec.level().gameObject("object"), 'levelOneObject');
    });
    
    it("creates the daddy object in the load", function() {
      var daddyMock = sandbox.spy(Daddy, 'create');

      new GameScreen(gameSpec, screen);

      Assert.ok(daddyMock.calledWith('daddy object'));
    });

    it("puts a progress bar on the screen", function() {
      var progressStub = sandbox.stub(ProgressBar, 'create');
      var progressBar = { name: 'progressBar' };
      progressStub.withArgs('progressBar', 'progress bar object').returns(progressBar);

      new GameScreen(gameSpec, screen);

      var bar = screen.findObjectNamed('progressBar');
      Assert.equal(bar, progressBar);
    });

    it("constructs a fed quinn checker from the daddy and quinn", function() {
      // Make a level constructable so you can test this
      // me like
      //Assert.ok(false);
    });

    it("updates the progress bar with the state of daddy's stress", function() {
      var fakeProgressBar = {
        stress: 0, 
        update: function(stress) {
          this.stress = stress;
        }
      };
      
      var fakeDaddy = {
        stress: 40,
        location: {x: 0, y: 0},
        update: sandbox.stub()
      };

      sandbox.stub(Daddy, 'create').returns(fakeDaddy);
      sandbox.stub(ProgressBar, 'create').returns(fakeProgressBar);
      var game = new GameScreen(gameSpec, screen);

      game.update();

      Assert.equal(fakeProgressBar.stress, 40);
    });

    it("Resets daddy's stress when Quinn is fed", function() {
      gameSpec.load('levelOne', function(level) {
        level.addGameObject('daddy', { stress: 50, stressRate: 100});
      });
     
      // Better IOC
      // Fuck IOC - treat as internals
      var QuinnStatus = require('../../script/feed_the_quinn/quinn_status');
      var quinnChecker = {
        check: function(daddy, baby) {
          return true;
        }
      };
      var ProgressBar = require('../../script/feed_the_quinn/progress_bar');
      var progressBar = { update: sandbox.stub() };
      sandbox.stub(ProgressBar, "create").returns(progressBar);
      sandbox.stub(QuinnStatus, "create").returns(quinnChecker);

      var gameScreen = new GameScreen(gameSpec, screen);
      gameScreen.update();

      Assert.equal(gameScreen.daddyStress(), 0);
    });
  });

  describe("update and keydowns", function() {
    var daddy,
        daddyMock,
        game;

    beforeEach(function() {
      sandbox.stub(FedQuinnChecker, "create").returns({ check: function() { return false; }});
      sandbox.stub(ProgressBar, "create").returns({ update: sandbox.stub() });
      game = new GameScreen(gameSpec, screen);
    });

    afterEach(function() {
      sandbox.restore();
    });
    
    beforeEach(function() {
      daddy = Daddy.create({});
      
      game.setDaddy(daddy);

      daddyMock = sandbox.mock(daddy);
    });

    it("updates the daddy with the keystate when something is pressed", function() {
      daddyMock.expects('update').withArgs({left: true});

      game.keydown({which: 37});
      game.update();

      daddyMock.verify();
    });

    it("doesnt change the key state until a keyup is sent", function() {
      daddyMock.expects('update').twice().withArgs({left: true});

      game.keydown({which: 37});
      game.update();
      game.update();

      daddyMock.verify();
    });

    it("Stops moving direction on a keyup", function() {
      daddyMock.expects('update').withArgs({left: true});
      daddyMock.expects('update').withArgs({left: false});
      
      game.keydown({which: 37});
      game.update();
      game.keyup({which: 37});
      game.update();

      daddyMock.verify();
    });
  });
});
