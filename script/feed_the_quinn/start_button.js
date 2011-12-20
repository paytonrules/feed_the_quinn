var Image = require("eskimo").Image;
module.exports = {
  create: function(objectData) {
    return {
      update: function() {},
      draw: function(screen) {
        screen.put(Image('start_button', 
                         objectData.location.x, 
                         objectData.location.y));
      }
    };
  },
};
