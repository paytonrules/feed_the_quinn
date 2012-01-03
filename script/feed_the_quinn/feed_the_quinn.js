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

  draw: function(screen) {
    sm().draw(screen);
  },

  click: function(location) {
    sm().click(location);
  }
};
