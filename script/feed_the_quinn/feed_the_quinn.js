var StateMachine = require("./state_machine");

module.exports = {
  create: function(spec, screen) {
    var transitionTable = require("./transition_table");
    var stateMachine = StateMachine.init(transitionTable, 
                                         { 
                                           spec: spec, 
                                           screen: screen
                                         });

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
