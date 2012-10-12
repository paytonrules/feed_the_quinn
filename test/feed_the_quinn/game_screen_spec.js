describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      Keyboard = eskimo.Keyboard,
      Assert = require('assert'),
      game = require('../../script/feed_the_quinn/game_screen'),
      Daddy = require("../../script/feed_the_quinn/daddy.js"),
      ProgressBar = require("../../script/feed_the_quinn/progress_bar.js"),
      gameSpec,
      screen;

  describe("load", function() {
    afterEach(function() {
      sandbox.restore();
    });

    beforeEach(function() {
      // Expose something very much like this to test mode,
      // but with a contractual obligation to match the gameScreen interface
      gameSpec = {
        load: function(name, func) {
          this.levelName = name;
          func(this.level);
        },
        level: {
          gameObject: function(key) {
            return this.internalGameObjects[key];
          },
          internalGameObjects: {daddy: {}}
        }
      };
      var Screen = require('eskimo').Screen;
      var Canvas = require('canvas');
      var canvas = new Canvas(200, 200);
      var $ = require('jquery');

      screen = new Screen($(canvas));
    });

    it("loads the levelOne on load", function() {
      game.load(gameSpec, screen);
      
      Assert.equal(gameSpec.levelName, 'levelOne');
    });

    it("creates the daddy object in the load", function() {
      gameSpec.level.internalGameObjects['daddy'] = 'daddy object';

      var daddyMock = sandbox.spy(Daddy, 'create');

      game.load(gameSpec, screen);

      Assert.ok(daddyMock.calledWith('daddy object'));
    });

    it("puts a progress bar on the screen", function() {
      gameSpec.level.internalGameObjects['progressBar'] = 'progress bar object';
      var progressStub = sandbox.stub(ProgressBar, 'create');
      var progressBar = { name: 'progressBar' };
      progressStub.withArgs('progressBar', 'progress bar object').returns(progressBar);

      game.load(gameSpec, screen);

      var bar = screen.findObjectNamed('progressBar');
      Assert.equal(bar, progressBar);
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
      game.load(gameSpec, screen);

      game.update();

      Assert.equal(fakeProgressBar.stress, 40);
    });

    it("Resets daddy's stress when Quinn is fed", function() {
      var daddy = {stress: 50, stressRate: 100 };
      gameSpec.level.internalGameObjects['daddy'] = daddy;
     
      // Better IOC
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

      game.load(gameSpec, screen);
      game.update();

      Assert.equal(game.daddyStress(), 0);
    });
  });

  describe("update", function() {
    var daddy,
        daddyMock;

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
