FeedTheQuinn.TitleScreen = {
  load: function(assets) {
    assets.load('background', FeedTheQuinn.Assets['title']['background']);  // Turn this into an 'asset loader' methinks
  },

  render: function() {
    imageList.push({name: 'background',
                    location: Eskimo.Point(0, 0)});
  }
};
