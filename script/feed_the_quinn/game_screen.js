var level = require('eskimo').Level,
    Image = require('eskimo').Image,
    Daddy = require('./daddy.js'),
    currentVelocity,
    daddy;

module.exports = {
  PLAYER_VELOCITY: 5,
  load: function() {
    level.load('levelOne');
    daddy = Daddy.create(level.gameObject('daddy'));
    currentVelocity = 0;
  },
  
  update: function() {
    daddy.update();
  },

  moveHoriz: function(direction) {
    daddy.moveHoriz(direction);
  },
};
