FeedTheQuinn.TitleScreen = (function() {
  var box, imageAssets, screen;

  return {
    load: function(theScreen) {
      screen = theScreen;
      // Also no likey - insulate from framework, even your own
      // and you dont need levels or screen
      Eskimo.LevelLoader.load('title', this);
      screen.put(Eskimo.Image("background", 0, 0));
    },

    update: function() {
      box = Eskimo.LevelLoader.getJukebox();
      box.play('song');
    }
  };
})();
