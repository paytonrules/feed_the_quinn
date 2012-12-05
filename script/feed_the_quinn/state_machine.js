var currentState;
var gameScreen = require("./game_screen");
var level = require("eskimo").Level;

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
