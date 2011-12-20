module.exports = (function() {
  var jukebox, 
      startButton,
      StartButton = require("./start_button"),
      LevelLoader = require("eskimo").LevelLoader,
      Image = require("eskimo").Image,
      background;

  return {
    load: function() {
      LevelLoader.load('title');
      background = LevelLoader.gameObject('background');
      startButton = StartButton.create(LevelLoader.gameObject('start_button'));
    },

    update: function() {
      jukebox = LevelLoader.getJukebox();
      jukebox.play('song');
    },

    draw: function(screen) {
      screen.put(Image("background", background.location.x, background.location.y));
      startButton.draw(screen);
    },

    click: function(state_machine, event) {
      startButton.click(state_machine, event);
    }
  };
})();
