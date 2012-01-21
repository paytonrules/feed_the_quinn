var currentState;
var gameScreen = require("./game_screen");
var level = require("eskimo").Level;

// This isn't a state machine.  Perhaps you could write it as one?  
// Although update/draw are not events
// Actually perhaps you need a delegate pattern here - anything automatically goes to its defined thingy

module.exports = {
  init: function() {
    currentState = require('./title_screen');
    currentState.load();

    return {
      setState: function(state) {
        currentState = state;
      },
      update: function() {
        currentState.update(this);
      },

      draw: function(screen) {
        currentState.draw(screen);
      },

      click: function(location) {
        if (currentState['click']) {
          currentState.click(this, location);
        }
      },

      keydown: function(event) {
        if (currentState['keydown']) {
          currentState.keydown(event);
        }
      },

      startGame: function() {
        currentState = gameScreen;
        currentState.load();
      },

      currentState: function() {
        return currentState;
      }
    };
  }
};
