var Keyboard = require('eskimo').Keyboard,
    keystate = {},
    Daddy = require('./daddy.js'),
    daddy,
    quinn,
    ProgressBar = require('./progress_bar.js'),
    progressBar,
    FedQuinnChecker = require('./quinn_status.js'),
    fedQuinnChecker, 
    Image = require('eskimo').Image;

module.exports = (function() {
  return function GameScreen(context) {
    var gameSpec = context.spec;
    var screen = context.screen;
    var init = function(level, screen) {
      daddy = Daddy.create(level.gameObject('daddy'));
      quinn = level.gameObject('baby');

      progressBar = ProgressBar.create('progressBar', level.gameObject('progressBar'));
      screen.put(progressBar);

      fedQuinnChecker = FedQuinnChecker.create({daddy: daddy, 
                                                quinn: Image("", quinn)});
    };

    gameSpec.load('levelOne', function(level) {
      init(level, screen);
    });

    this.update = function() {
      if (fedQuinnChecker.check(keystate)) {
        daddy.reset();
      }
      daddy.update(keystate);
      progressBar.update(daddy.stress());
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
