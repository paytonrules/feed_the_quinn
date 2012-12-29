var TitleScreen = require("./title_screen");
var GameScreen = require("./game_screen");

module.exports = [
  [TitleScreen, "startGame", GameScreen],
  [TitleScreen, "update", TitleScreen, "update"],
  [TitleScreen, "click", TitleScreen, "click"],
  [GameScreen, "update", GameScreen, "update"],
  [GameScreen, "keydown", GameScreen, "keydown"],
  [GameScreen, "keyup", GameScreen, "keyup"]
];
