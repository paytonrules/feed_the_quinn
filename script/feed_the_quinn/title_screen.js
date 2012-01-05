module.exports = (function() {
  var jukebox, 
      startButton,
      _ = require('underscore'), 
      StartButton = require("./start_button"),
      Level = require("eskimo").Level,
      Image = require("eskimo").Image,
      background;

  function start_game(state_machine) {
    state_machine.start_game();
  }

  return {
    load: function() {
      Level.load('title');
      background = Level.gameObject('background');
      startButton = StartButton.create(Level.gameObject('start_button'));
    },

    update: function() {
      jukebox = Level.getJukebox();
      jukebox.play('song');
    },

    draw: function(screen) {
      screen.put(Image("background", background.location.x, background.location.y));
      startButton.draw(screen);
    },

    click: function(state_machine, location) {
      startButton.click(location, _.bind(start_game, this, state_machine));
    }
  };
})();
