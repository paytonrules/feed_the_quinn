module.exports = (function() {
  var startButton,
      _ = require('underscore'), 
      StartButton = require("./start_button"),
      Level = require("eskimo").Level,
      Image = require("eskimo").Image,
      jukebox,
      background;

  function startGame(state_machine) {
    state_machine.startGame();
  }

  return {
    load: function() {
      Level.load('title');
      background = Level.gameObject('background');
      startButton = StartButton.create(Level.gameObject('start_button'));
      jukebox = Level.getJukebox();
    },

    update: function() {
      jukebox.play('song');
    },

    draw: function(screen) {
      screen.put(Image("background", background.location.x, background.location.y));
      startButton.draw(screen);
    },

    click: function(state_machine, location) {
      jukebox.stop('song');
      startButton.click(location, _.bind(startGame, this, state_machine));
    }
  };
})();
