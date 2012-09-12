var Keyboard = require('eskimo').Keyboard,
    KEYMAP = {},
    keystate = {},
    _ = require('underscore'),
    Daddy = require('./daddy.js'),
    daddy,
    ProgressBar = require('./progress_bar.js'),
    progressBar,
    FedQuinnChecker = require('./quinn_status.js'),
    fedQuinnChecker; // 6 dependencies already

// Probably deserves to be moved into the FW
// Don't think in terms of "framework" but make an object, then eventually
// stick it there
KEYMAP[Keyboard.LEFT_ARROW] = 'left';
KEYMAP[Keyboard.RIGHT_ARROW] = 'right';
KEYMAP[Keyboard.UP_ARROW] = 'up';
KEYMAP[Keyboard.DOWN_ARROW] = 'down';

// This design fairly blows.  Fix
// It even seems to cause test pollution
module.exports = {
  load: function(gameSpec, screen) {
    var that = this;
    gameSpec.load('levelOne', function(level) {
      daddy = Daddy.create(level.gameObject('daddy'));
      that.daddy = daddy;

      // I think I want this in the framework (note daddy is not put on the
      // screen explicitly)
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
  keydown: function(event) {
    keystate[KEYMAP[event.which]] = true;
  },

  keyup: function(event) {
    keystate[KEYMAP[event.which]] = false;
  },

  // Only for testing
  setDaddy: function(newDaddy) {
    daddy = newDaddy;
  }
};
