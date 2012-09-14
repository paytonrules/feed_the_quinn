var Keyboard = require('eskimo').Keyboard,
    keystate = {},
    Daddy = require('./daddy.js'),
    daddy,
    ProgressBar = require('./progress_bar.js'),
    progressBar,
    FedQuinnChecker = require('./quinn_status.js'),
    fedQuinnChecker; // 6 dependencies already

// This design fairly blows.  Fix
// It even seems to cause test pollution
module.exports = {
  load: function(gameSpec, screen) {
    var that = this;
    gameSpec.load('levelOne', function(level) {
      daddy = Daddy.create(level.gameObject('daddy'));
      that.daddy = daddy;

      // I think I want this in the framework - a generic progress bar - 
      // (note daddy is not put on the // screen explicitly)
      progressBar = ProgressBar.create('progressBar', level.gameObject('progressBar'));
      screen.put(progressBar);

      fedQuinnChecker = FedQuinnChecker.create();
    });
  },
  
  update: function() {
    if (fedQuinnChecker.check()) {
      daddy.reset();
    }
    daddy.update(keystate);
    progressBar.update(daddy.stress);
  },

  // Probably not at the right level of abstraction
  // Could definitely be a framework object
  keydown: function(event) {
    keystate[Keyboard[event.which]] = true;
  },

  keyup: function(event) {
    keystate[Keyboard[event.which]] = false;
  },

  // Only for testing
  setDaddy: function(newDaddy) {
    daddy = newDaddy;
  }
};
