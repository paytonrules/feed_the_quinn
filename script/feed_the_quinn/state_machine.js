var currentState = require('./title_screen');

module.exports = {
  // first state probably?  Initial state?  This is the init method after all.
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
