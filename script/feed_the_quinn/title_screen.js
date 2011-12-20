module.exports = (function() {
  var jukebox, 
      screen,
      startButton,
      StartButton = require("./start_button"),
      LevelLoader = require("eskimo").LevelLoader,
      Image = require("eskimo").Image;

  return {
    load: function(theScreen) {
      var background;
      screen = theScreen;
      LevelLoader.load('title');
      background = LevelLoader.gameObject('background');
      startButton = StartButton.create(LevelLoader.gameObject('start_button'));

      // No business being in load - you should have a draw
      /*
       *screen.put(Image("background", background.location.x, background.location.y));
       *startButton.draw(screen);
       */
    },

    update: function() {
      jukebox = LevelLoader.getJukebox();
      jukebox.play('song');
    }
  };
})();
