FeedTheQuinn.TitleScreen = (function() {
  var box;

  return {
    load: function(assets, screen) {
      assets.images.load('background', FeedTheQuinn.Assets['title']['background']);  // Turn this into an 'asset loader' methinks
      assets.sounds.load('song', FeedTheQuinn.Assets['title']['song']);
      screen.put('background');
      box = Eskimo.Jukebox(assets.sounds);
    },

    update: function() {
      box.play('song');
    }
  };
})();
