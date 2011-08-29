describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, fakeAssets;

  fakeAssets = (function() { 
    var imageAssets = {};
    
    return {
      images: {
        get: function(key) {
          return imageAssets[key];
        },
        load: function(key, src) {
          imageAssets[key] = src;
        }
      },
      clear: function() {
        imageAssets = {};
      }
    };
  })();
  
  beforeEach(function() {
    TitleScreen = require("../spec_helper").FeedTheQuinn.TitleScreen;
    fakeAssets.clear();
    FeedTheQuinn.Assets = {"title": {"background": "backgroundImage.src"}};
  });

  it("loads the assets from the global assets map", function() {
    TitleScreen.load(fakeAssets);

    expect(fakeAssets.images.get("background")).toEqual("backgroundImage.src");
  });

  it("adds the background to the image list", function() {
    imageList = [];

    TitleScreen.load(fakeAssets);
    TitleScreen.render(imageList);

    expect(imageList[0].name).toEqual('background');
    expect(imageList[0].location.x).toEqual(0);
    expect(imageList[0].location.y).toEqual(0);
  });
});
