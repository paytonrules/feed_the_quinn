var StateMachine = require("./state_machine"),
    TransitionTable = require("./transition_table"),
    daddyLoader = require("./loaders/daddy"),
    AssetLoader = require("eskimo").AssetLoader;

module.exports = {
  create: function(spec, screen) {
    spec.registerLoader('daddy', daddyLoader.create(AssetLoader));

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
  }
};
