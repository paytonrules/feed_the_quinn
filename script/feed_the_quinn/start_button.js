var Image = require("eskimo").Image;

module.exports = {

  create: function(objectData) {
    var buttonImage = Image('start_button', 
                            objectData.location.x,
                            objectData.location.y);

    return {

      draw: function(screen) {
        screen.put(buttonImage);
      },

      click: function(location, callback) {
        callback();
      }
    };
  },
};
