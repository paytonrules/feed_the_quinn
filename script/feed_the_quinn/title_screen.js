FeedTheQuinn.TitleScreen = (function() {
  var box;

  return {
    load: function(assets) {
      assets.images.load('background', FeedTheQuinn.Assets['title']['background']);  // Turn this into an 'asset loader' methinks
      assets.sounds.load('song', FeedTheQuinn.Assets['title']['song']);
      box = Eskimo.Jukebox(assets.sounds);
    },

    update: function(imageList) {
      box.play('song');

      imageList.push({name: 'background',
                      location: Eskimo.Point(0, 0)});
    }
  };
})();
