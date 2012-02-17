var Image = require("eskimo").Image;

module.exports = {

  create: function(objectData) {
    // TODO - you dont need to construct this object
    // decorate the game objects rather than wrapping them
    var buttonImage = Image('start_button', objectData);

    return {

      click: function(location, callback) {
        if (buttonImage.contains(location.x, location.y)) {
          callback();
        }
      }
    };
  },
};
