FeedTheQuinn.TitleScreen = (function() {
  var box;

  return {
    load: function(assets, screen) {
      assets.images.load('background', FeedTheQuinn.Assets['title']['background']);  // Turn this into an 'asset loader' methinks
      assets.images.load('start_button', FeedTheQuinn.Assets['title']['start_button']);

      assets.sounds.load('song', FeedTheQuinn.Assets['title']['song']);
      screen.put(Eskimo.Image('background', 0, 0));
      screen.put(Eskimo.Image('start_button', 400, 400));
      box = Eskimo.Jukebox(assets.sounds);
    },

    update: function() {
      box.play('song');
    }
  };
})();
