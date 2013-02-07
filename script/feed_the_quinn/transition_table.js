var TitleScreen = require("./title_screen");
var GameScreen = require("./game_screen");
var Restarting = require("./restarting");

module.exports = [
  [TitleScreen, "startGame", GameScreen],
  [TitleScreen, "update", TitleScreen, "update"],
  [TitleScreen, "click", TitleScreen, "click"],
  [GameScreen, "update", GameScreen, "update"],
  [GameScreen, "keydown", GameScreen, "keydown"],
  [GameScreen, "keyup", GameScreen, "keyup"],
  [GameScreen, "daddyDies", GameScreen, "endGame"],
  [GameScreen, "click", GameScreen, "click"],
  [GameScreen, "restart", Restarting], 
  [Restarting, "update", GameScreen]
  // Yes you could go through a transitory state
];
