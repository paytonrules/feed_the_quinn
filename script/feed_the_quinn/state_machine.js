var currentState;
var _ = require('underscore');

module.exports = {
  init: function(transitionTable, options) {
    currentState = new transitionTable[0][0](options);

    var stateMachine = {
      setState: function(state) {
        currentState = state;
      },
      
      currentState: function() {
        return currentState;
      }
    };
    
    var transitionMap = {};
    _.each(transitionTable, function(row) {
      var startState = row[0];
      var eventName = row[1];

      transitionMap[startState] = transitionMap[startState] || {};

      transitionMap[startState][eventName] = function() {
        var transition = row[3];
        if (transition) {
          var args = Array.prototype.slice.call(arguments);
          args.unshift(stateMachine);
          currentState[transition].apply(currentState, args); 
        }

        var State = row[2];
        if (currentState.constructor !== State && currentState.constructor === row[0]) {
          currentState = new State(options);
        }
      };

      if (typeof stateMachine[eventName] == "undefined") {
        stateMachine[eventName] = function() {
          transitionMap[currentState.constructor][eventName].apply(stateMachine, arguments);
        }
      }
    });

    return stateMachine;
  }
};
