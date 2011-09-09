FeedTheQuinn.TitleScreen = (function() {
  var box, startButton;

  return {
    load: function(assets, screen) {
      screen.loadScreen(FeedTheQuinn.Assets['title'], this);

      assets.sounds.load('song', FeedTheQuinn.Assets['title']['song']);
      box = Eskimo.Jukebox(assets.sounds);
    },

    update: function() {
      box.play('song');
    }
  };
})();
