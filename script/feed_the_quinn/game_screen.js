var level = require('eskimo').Level,
    Image = require('eskimo').Image,
    currentVelocity = 0,
    daddy;

function daddy() {
  return level.gameObject('daddy');
}

module.exports = {
  PLAYER_VELOCITY: 5,
  load: function() {
    level.load('levelOne');
  },

  update: function() {
    daddy().location.x += currentVelocity;
  },

  moveLeft: function() {
    if (currentVelocity == 0) {
      currentVelocity -= this.PLAYER_VELOCITY;
    }
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
