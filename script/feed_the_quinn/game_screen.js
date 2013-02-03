var Keyboard = require('eskimo').Keyboard,
    Daddy = require('./daddy.js'),
    ProgressBar = require('./progress_bar.js'),
    jquery = require('jquery'),
    Sprite = require('eskimo').Sprite,
    _ = require('underscore');

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
        food = [],
        keystate = {};

    function putFoodOnScreenInRandomSpot(foodSheet) {
      var newFood = jquery.extend(true, {}, foodSheet);

      newFood.location = {
        x: Math.random() * (screen.width() - newFood.width()),
        y: Math.random() * (screen.height() - newFood.height())
      };

      screen.put(newFood);
      food.push(newFood);
    }

    var init = function(level, screen) {
      quinn = level.gameObject('baby');
      foodSheet = level.gameObject('food');
      daddy = level.gameObject('daddy');
      screen.put(daddy);
      
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

      if (!daddy.hasFood()) {
        var intersectingFood = _(food).find(function(pieceOfFood) {
          return pieceOfFood.intersects(daddy);
        });

        if (intersectingFood) {
          daddy.pickUpFood();
          food = _(food).reject(function(pieceOfFood) { return pieceOfFood === intersectingFood; });

          screen.remove(intersectingFood);
        }
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
