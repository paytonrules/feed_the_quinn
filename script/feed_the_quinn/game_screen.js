var level = require('eskimo').Level;
var Image = require('eskimo').Image;
module.exports = {
  load: function() {
    level.load('levelOne');
  },

  update: function() {},

  draw: function(screen) {
    var floor = level.gameObject('floor');
    screen.put(Image('floor', floor.location.x, floor.location.y));
    var daddy = level.gameObject('daddy');
    screen.put(Image('daddy', daddy.location.x, floor.location.y));
    var baby = level.gameObject('baby');
    screen.put(Image('mario', baby.location.x, baby.location.y));
  }
};
