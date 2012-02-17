var level = require('eskimo').Level,
    Keyboard = require('eskimo').Keyboard,
    Daddy = require('./daddy.js'),
    keystate = {},
    daddy;

module.exports = {
  load: function() {
    level.load('levelOne');
    daddy = Daddy.create(level.gameObject('daddy'));
  },
  
  update: function() {
    daddy.update(keystate);
  },

  keydown: function(event) {
    if (event.which === Keyboard.LEFT_ARROW) {
      keystate.left = true;
    }
  },

  keyup: function(event) {
    if (event.which === Keyboard.LEFT_ARROW) {
      keystate.left = false;
    }
  },

  setDaddy: function(newDaddy) {
    daddy = newDaddy;
  }
};
