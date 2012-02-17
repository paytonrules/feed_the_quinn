var StateMachine = require("./state_machine"),
    stateMachine;

function sm() {
  if (typeof(stateMachine) === "undefined") {
    stateMachine = StateMachine.init();
  }
  return stateMachine;
}

module.exports = {
  update: function() {
    sm().update();
  },

  click: function(location) {
    sm().click(location);
  },

  keydown: function(event) {
    sm().keydown(event);
  },

  keyup: function(event) {
    sm().keyup(event);
  }
};
