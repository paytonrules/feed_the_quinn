var currentState;

module.exports = {
  init: function(screen) {
    currentState = require('./title_screen');
    currentState.load(screen);

    return {
      currentState: currentState, 
      update: function() {
        currentState.update();
      },
      draw: function(screen) {
        currentState.draw(screen);
      }
    };
  }
};
