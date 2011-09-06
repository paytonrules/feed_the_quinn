FeedTheQuinn.TitleScreen = (function() {
  var box;

  return {
    load: function(assets, screen) {
      screen.loadScreen(FeedTheQuinn.Assets['title']);

      assets.sounds.load('song', FeedTheQuinn.Assets['title']['song']);
      box = Eskimo.Jukebox(assets.sounds);
    },

    update: function() {
      box.play('song');
    }
  };
})();
