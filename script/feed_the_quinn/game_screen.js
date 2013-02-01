var Keyboard = require('eskimo').Keyboard,
    Daddy = require('./daddy.js'),
    ProgressBar = require('./progress_bar.js'),
    jquery = require('jquery'),
    Sprite = require('eskimo').Sprite;

module.exports = (function() {
  return function GameScreen(context) {
    var gameSpec = context.spec,
        screen = context.screen,
        updates = 0,
        foodSheet,
        progressBarSpec = {},
        daddy,
        quinn,
        progressBar,
        keystate = {};

    function putFoodOnScreenInRandomSpot(foodSheet) {
      var food = jquery.extend(true, {}, foodSheet);

      food.location = {
        x: Math.random() * (screen.width() - food.width()),
        y: Math.random() * (screen.height() - food.height())
      };

      screen.put(food);
    }

    var init = function(level, screen) {
      quinn = level.gameObject('baby');
      foodSheet = level.gameObject('food');

      // Could convert to custom objects using gameSpec.registerLoader
      // Which is pretty awesome
      // but wait - daddy should be a sprite
      daddy = level.gameObject('daddy');
      // DONT FORGET TO PUT DADDY ON THE SCREEN
      
      progressBarSpec = level.gameObject('progressBar');
      progressBar = ProgressBar.create('progressBar', progressBarSpec);
      screen.put(progressBar);
    };

    gameSpec.load('levelOne', function(level) {
      init(level, screen);
    });

    this.update = function(sm) {
      updates++;

      if (updates % 100 === 0) {
        putFoodOnScreenInRandomSpot(foodSheet);
      }

      if (quinn.intersects(daddy) && keystate.spacebar) {
        daddy.reset();
      }
      daddy.update(keystate);
      progressBar.update(daddy.stress());

      if (daddy.isDead) {
        sm.daddyDies();
      }
    };

    // Probably not at the right level of abstraction
    // Could definitely be a framework object
    this.keydown = function(sm, event) {
      keystate[Keyboard[event.which]] = true;
    };

    this.keyup = function(sm, event) {
      keystate[Keyboard[event.which]] = false;
    };

    // Only for testing
    this.setDaddy = function(newDaddy) {
      daddy = newDaddy;
    };

    this.daddyStress = function() {
      return daddy.stress;
    };
  };
})();
