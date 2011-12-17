var StateMachine = require("./state_machine"),
    stateMachine;

function sm() {
  if (typeof(stateMachine) === "undefined") {
    stateMachine = StateMachine.init(module.exports.screen);
  }
  return stateMachine;
}

module.exports = {
  update: function() {
    sm().update();
  }
};
