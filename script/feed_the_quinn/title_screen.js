module.exports = (function() {
  var StartButton = require("./start_button"),
      _ = require('underscore');

  return function TitleScreen(gameSpec, screen) {
    var startButton, jukebox;
    var _ = require('underscore');

    gameSpec.load("title", function(level) {
      jukebox = level.getJukebox();
      startButton = StartButton.create(level.gameObject('start_button'));
    });

    this.update = function() {
      jukebox.play('backgroundMusic');
    };

    this.click = function(stateMachine, location) {
      jukebox.stop('backgroundMusic');
      startButton.click(location, stateMachine.startGame);    
    };

    return this;
  };

})();
