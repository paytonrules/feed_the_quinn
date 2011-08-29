FeedTheQuinn.TitleScreen = {
  load: function(assets) {
    assets.images.load('background', FeedTheQuinn.Assets['title']['background']);  // Turn this into an 'asset loader' methinks
  },

  update: function(imageList) {
    imageList.push({name: 'background',
                    location: Eskimo.Point(0, 0)});
  }
};
