var Keyboard = require('eskimo').Keyboard,
    keystate = {},
    Daddy = require('./daddy.js'),
    daddy,
    ProgressBar = require('./progress_bar.js'),
    progressBar,
    FedQuinnChecker = require('./quinn_status.js'),
    fedQuinnChecker; 

module.exports = (function() {
  return function GameScreen(gameSpec, screen) {
    var instantiator = function(level, screen) {
      daddy = Daddy.create(level.gameObject('daddy'));

      // I think I want this in the framework - a generic progress bar 
      progressBar = ProgressBar.create('progressBar', level.gameObject('progressBar'));
      screen.put(progressBar);

      fedQuinnChecker = FedQuinnChecker.create({daddy: daddy, 
                                               quinn: {location: {x: 0}, boundingBox: {x: 0}},
                                               keystate: {}});
    };

    gameSpec.load('levelOne', function(level) {
      instantiator(level, screen);
    });

    this.update = function() {
      if (fedQuinnChecker.check()) {
        daddy.reset();
      }
      daddy.update(keystate);
      progressBar.update(daddy.stress);
    };

    // Probably not at the right level of abstraction
    // Could definitely be a framework object
    this.keydown = function(event) {
      keystate[Keyboard[event.which]] = true;
    };

    this.keyup = function(event) {
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
