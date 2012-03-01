var StateMachine = require("./state_machine");

module.exports = {
  create: function(screen) {
    var stateMachine = StateMachine.init(screen);

    return {
      update: function() {
        stateMachine.update();
      },
   
      click: function(location) {
        stateMachine.click(location);
      },
      
      keydown: function(event) {
        stateMachine.keydown(event);
      },

      keyup: function(event) {
        stateMachine.keyup(event);
      }

    };
  },
};
