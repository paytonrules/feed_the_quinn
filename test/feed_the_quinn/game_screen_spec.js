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

  afterEach(function() {
    sandbox.restore();
  });

  describe("load", function() {
    beforeEach(function() {

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
        update: sandbox.stub()
      };

      sandbox.stub(Daddy, 'create').returns(fakeDaddy);
      sandbox.stub(ProgressBar, 'create').returns(fakeProgressBar);
      game.load(gameSpec, screen);

      game.update();

      Assert.equal(fakeProgressBar.stress, 40);
    });
  });

  describe("update", function() {
    var daddy,
        daddyMock;
    
    beforeEach(function() {
      daddy = Daddy.create({});
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
