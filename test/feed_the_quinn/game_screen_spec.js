describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      Assert = require('assert'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      ProgressBar = require("../../script/feed_the_quinn/progress_bar.js"),
      TestGameSpecFactory = require('eskimo').TestGameSpecFactory,
      level,      
      gameSpec,
      screen;

  describe("Game Screen / Level One", function() {
    beforeEach(function() {
      level = { 
        "levelOne" : {
          "object" : "levelOneObject",
          "daddy" : {location: {x: 0, y: 0}},
          "progressBar" : "progress bar object",
          "baby" : {location: { x: 100, y: 100}, boundingBox: {width: 0, height: 0}}
        }
      };

      gameSpec = TestGameSpecFactory.create(level);
      var Screen = require('eskimo').Screen;
      var Canvas = require('canvas');
      var canvas = new Canvas(200, 200);
      var $ = require('jquery');

      screen = new Screen($(canvas));
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe("moving daddy", function() {

      beforeEach(function() {
        gameSpec.load("levelOne", function(level) {
          level.addGameObject('daddy', {
            velocity: 1,
            location: {x: 2, y: 0}
          });
        });
      });

      it("updates the daddy with the keystate when something is pressed", function() {
        var game = new GameScreen(gameSpec, screen);

        game.keydown({which: 37});
        game.update();

        Assert.equal(1, gameSpec.level().gameObject('daddy').location.x);
      });

      it("doesnt change the key state until a keyup is sent", function() {
        var game = new GameScreen(gameSpec, screen);

        game.keydown({which: 37});
        game.update();
        game.update();

        Assert.equal(0, gameSpec.level().gameObject('daddy').location.x);
      });

      it("Stops moving direction on a keyup", function() {
        var game = new GameScreen(gameSpec, screen);

        game.keydown({which: 37});
        game.update();
        game.keyup({which: 37});
        game.update();

        Assert.equal(1, gameSpec.level().gameObject('daddy').location.x);
      });
      
      it("Resets daddy's stress when Baby is fed", function() {
        gameSpec.load('levelOne', function(level) {
          level.addGameObject('daddy', { location: {x: 10, y: 10}, stress: 50, stressRate: 100});
          level.addGameObject('baby', { location: {x: 10, y: 10}, boundingBox: {width:10, height: 10}});
        });

        var game = new GameScreen(gameSpec, screen);
        game.keydown({which: 32}); // Spacebar
        game.update();

        Assert.equal(gameSpec.level().gameObject('daddy').stress, 0);
      });
    });

    describe("progress bar", function() {

      it("is put on the screen", function() {
        var progressBarCreation = sandbox.spy(ProgressBar, 'create');

        var game = new GameScreen(gameSpec, screen);
        
        Assert.strictEqual(screen.findObjectNamed('progressBar'),
                           progressBarCreation.returnValues[0]);
      });
      
      it("updates the progress bar with the state of daddy's stress", function() {
        gameSpec.load("levelOne", function(level) {
          level.addGameObject('progressBar', {
            stress: 0,
            stressRate: 100
          });

          level.addGameObject('daddy', {
            stress: 39
          });
        });

        var game = new GameScreen(gameSpec, screen);

        game.update();

        Assert.equal(gameSpec.level().gameObject('progressBar').stress, 40);
      });
    });
  });
});
