module.exports = (function() {
  var startButton,
      StartButton = require("./start_button"),
      jukebox;

  function startGame(state_machine) {
    state_machine.startGame();
  }

  return {
    load: function(gameSpec) {
      gameSpec.load("title", function(level) {
        jukebox = level.getJukebox();
        startButton = StartButton.create(level.gameObject('start_button'));
      });
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
