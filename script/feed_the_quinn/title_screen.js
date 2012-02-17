module.exports = (function() {
  var startButton,
      StartButton = require("./start_button"),
      Level = require("eskimo").Level,
      Image = require("eskimo").Image,
      jukebox;

  function startGame(state_machine) {
    state_machine.startGame();
  }

  return {
    load: function() {
      Level.load('title');
      startButton = StartButton.create(Level.gameObject('start_button'));
      jukebox = Level.getJukebox();
    },

    update: function() {
      jukebox.play('backgroundMusic');
    },

    click: function(state_machine, location) {
      jukebox.stop('backgroundMusic');
      startButton.click(location, _.bind(startGame, this, state_machine));
    }
  };
})();
