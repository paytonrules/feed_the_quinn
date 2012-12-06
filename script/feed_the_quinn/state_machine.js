var currentState;
// I would like to remove this require game
var GameScreen = require("./game_screen");
var TitleScreen = require("./title_screen");

module.exports = {
  init: function(spec, screen) {
    currentState = new TitleScreen();

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
        currentState = new GameScreen();
//        currentState.load(spec, screen);
      },

      currentState: function() {
        return currentState;
      }
    };
  }
};
