var currentState;
var gameScreen = require("./game_screen");
var level = require("eskimo").Level;

// This isn't a state machine.  Perhaps you could write it as one?  
// Although update is not an event
// Actually perhaps you need a delegate pattern here - anything automatically goes to its defined thingy

module.exports = {
  init: function(spec, screen) {
    currentState = require('./title_screen');
    currentState.load(spec);

    return {
      setState: function(state) {
        currentState = state;
      },
      
      update: function() {
        currentState.update(this);
      },
      
      click: function(location) {
        if (currentState['click']) {
          currentState.click(this, location);
        }
      },

      keydown: function(event) {
        if (currentState.keydown) {
          currentState.keydown(event);
        }
      },

      keyup: function(event) {
        if (currentState.keyup) {
          currentState.keyup(event);
        }
      },

      startGame: function() {
        currentState = gameScreen;
        currentState.load(spec, screen);
      },

      currentState: function() {
        return currentState;
      }
    };
  }
};
