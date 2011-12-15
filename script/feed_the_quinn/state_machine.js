var currentState = require('./title_screen');

module.exports = {
  init: function(screen) {
    currentState.load(screen);

    return {
      currentState: currentState, 
      update: function() {
        this.currentState.update();
      }
    };
  }
};
