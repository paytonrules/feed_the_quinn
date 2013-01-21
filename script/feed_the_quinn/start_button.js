var Sprite = require("eskimo").Sprite;

module.exports = {
  create: function(buttonSprite) {
    return {

      click: function(location, callback) {
        if (buttonSprite.contains(location.x, location.y)) {
          callback();
        }
      }
    };
  }
};
