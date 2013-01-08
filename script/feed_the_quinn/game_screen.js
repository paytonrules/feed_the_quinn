var Keyboard = require('eskimo').Keyboard,
    keystate = {},
    Daddy = require('./daddy.js'),
    daddy,
    quinn,
    ProgressBar = require('./progress_bar.js'),
    progressBar,
    FedQuinnChecker = require('./quinn_status.js'),
    fedQuinnChecker, 
    jquery = require('jquery'), // Temp
    Image = require('eskimo').Image;

module.exports = (function() {
  return function GameScreen(context) {
    var gameSpec = context.spec,
        screen = context.screen,
        updates = 0,
        foodDataSpec,
        progressBarSpec = {};

    function putFoodOnScreenInRandomSpot(foodDataSpec) {
      var food = {};
      
      for(var key in foodDataSpec) {
        food[key] = foodDataSpec[key];
      }
      food.location = {
        x: Math.random() * (screen.width() - food.width()),
        y: Math.random() * (screen.height() - food.height())
      };

      screen.put(food);
    }

    var init = function(level, screen) {
      daddy = Daddy.create(level.gameObject('daddy'));
      quinn = level.gameObject('baby');
      foodDataSpec = level.gameObject('food');

      progressBarSpec = level.gameObject('progressBar');
      progressBar = ProgressBar.create('progressBar', progressBarSpec);
      screen.put(progressBar);

      fedQuinnChecker = FedQuinnChecker.create({daddy: daddy, 
                                                quinn: Image("", quinn)});
    };

    gameSpec.load('levelOne', function(level) {
      init(level, screen);
    });

    this.update = function(sm) {
      updates++;

      if (updates % 100 == 0) {
        putFoodOnScreenInRandomSpot(foodDataSpec);
      }

      if (fedQuinnChecker.check(keystate)) {
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
