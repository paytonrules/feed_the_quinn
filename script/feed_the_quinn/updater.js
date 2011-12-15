var StateMachine = require("./state_machine");

module.exports = function(screen) {
  var stateMachine = StateMachine.init(screen);

  function update() {
    stateMachine.update();
  };
  this.update = update;
};

