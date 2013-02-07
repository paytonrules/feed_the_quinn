var Keyboard = require('eskimo').Keyboard,
    Daddy = require('./daddy.js'),
    ProgressBar = require('./progress_bar'),
    jquery = require('jquery'),
    Sprite = require('eskimo').Sprite,
    StartButton = require('./start_button'),
    Text = require('./text'),
    _ = require('underscore');

module.exports = (function() {
  return function GameScreen(context) {
    var gameSpec = context.spec,
        screen = context.screen,
        updates = 0,
        foodSheet,
        daddy,
        quinn,
        progressBar,
        score,
        food = [],
        keystate = {};

    var that = this;

    gameSpec.load('levelOne', function(level) {
      function putFoodOnScreenInRandomSpot(foodSheet) {
        var newFood = jquery.extend(true, {}, foodSheet);

        newFood.location = {
          x: Math.random() * (screen.width() - newFood.width()),
          y: Math.random() * (screen.height() - newFood.height())
        };

        screen.put(newFood);
        food.push(newFood);
      }
 
      var checkIfPickingUpFood = function() {
        var intersectingFood = _(food).find(function(pieceOfFood) {
          return pieceOfFood.intersects(daddy);
        });

        if (intersectingFood) {
          daddy.pickUpFood();
          food = _(food).reject(function(pieceOfFood) { return pieceOfFood === intersectingFood; });

          screen.remove(intersectingFood);
        }
      };

      that.update = function(sm) {
        updates++;

        if (updates % 100 === 0) {
          putFoodOnScreenInRandomSpot(foodSheet);
        }

        if (quinn.intersects(daddy) && daddy.hasFood()) {
          daddy.dropFood();
          score.score += 10;
        }

        if (!daddy.hasFood()) {
          checkIfPickingUpFood();
        }

        daddy.update(keystate);
        progressBar.update(daddy.stress());

        if (daddy.isDead) {
          sm.daddyDies();
        }
      };

      that.endGame = function(sm) {
        that.update = function() {}; // I like this idea

        score.font = level.gameObject('endGameScore').font;
        score.textAlign = 'center';
        score.textBaseline = 'middle';
        score.location.x = screen.width() / 2;
        score.location.y = screen.height() / 2;

        var restartButton = StartButton.create(level.gameObject('newGameButton'));

        that.click = function(stateMachine, location) {
          restartButton.click(location, function() {
            sm.restart();
          });
        };

        screen.put(level.gameObject('newGameButton'));
      };

      // Probably not at the right level of abstraction
      // Could definitely be a framework object
      that.keydown = function(sm, event) {
        keystate[Keyboard[event.which]] = true;
      };

      that.keyup = function(sm, event) {
        keystate[Keyboard[event.which]] = false;
      };

      // Only for testing
      that.setDaddy = function(newDaddy) {
        daddy = newDaddy;
      };

      that.daddyStress = function() {
        return daddy.stress;
      };

      quinn = level.gameObject('baby');
      foodSheet = level.gameObject('food');
      daddy = level.gameObject('daddy');
      screen.put(daddy);

      progressBar = ProgressBar.create('progressBar', level.gameObject('progressBar'));
      screen.put(progressBar);

      score = level.gameObject('score');
      screen.put(Text.create(score, 'score'));
    });
  };
})();
