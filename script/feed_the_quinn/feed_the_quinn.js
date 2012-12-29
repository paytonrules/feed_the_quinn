var StateMachine = require("./state_machine");
var TransitionTable = require("./transition_table");

module.exports = {
  create: function(spec, screen) {
    var stateMachine = StateMachine.init(TransitionTable, 
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
