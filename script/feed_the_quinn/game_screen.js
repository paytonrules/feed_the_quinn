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

  // Eventually want to remove the idea of draw methods in favor
  // of scenes and visible objects
  draw: function(screen) {
    var floor = level.gameObject('floor');
    screen.put(Image('floor', floor.location.x, floor.location.y));
    screen.put(Image('daddy', daddy.location.x, floor.location.y));
    var baby = level.gameObject('baby');
    screen.put(Image('mario', baby.location.x, baby.location.y));
  }
};
