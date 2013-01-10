var Sprite = require("eskimo").Sprite;

module.exports = {

  create: function(objectData) {
    // TODO - you dont need to construct this object
    // decorate the game objects rather than wrapping them
    var buttonSprite = Sprite('start_button', objectData);

    return {

      click: function(location, callback) {
        if (buttonSprite.contains(location.x, location.y)) {
          callback();
        }
      }
    };
  },
};
