var level = require('eskimo').Level,
    Keyboard = require('eskimo').Keyboard,
    Daddy = require('./daddy.js'),
    ProgressBar = require('./progress_bar.js'),
    KEYMAP = {},
    keystate = {},
    _ = require('underscore'),
    daddy,
    progressBar;

// Probably deserves to be moved into the FW
KEYMAP[String(Keyboard.LEFT_ARROW)] = 'left';
KEYMAP[String(Keyboard.RIGHT_ARROW)] = 'right';
KEYMAP[String(Keyboard.UP_ARROW)] = 'up';
KEYMAP[String(Keyboard.DOWN_ARROW)] = 'down';

module.exports = {
  load: function() {
    level.load('levelOne');
    daddy = Daddy.create(level.gameObject('daddy'));
    progressBar = ProgressBar.create(level.gameObject('progressBar'));
  },
  
  update: function() {
    daddy.update(keystate);
    progressBar.update(daddy.stress);
  },

  // Probably not at the right level of abstraction
  keydown: function(event) {
    keystate[KEYMAP[String(event.which)]] = true;
  },

  keyup: function(event) {
    keystate[KEYMAP[String(event.which)]] = false;
  },

  setDaddy: function(newDaddy) {
    daddy = newDaddy;
  }
};
