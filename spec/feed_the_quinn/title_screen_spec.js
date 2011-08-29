describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, fakeAssets;

  fakeAssets = (function() { 
    var assets = {};
    return {
      get: function(key) {
        return assets[key];
      },
      load: function(key, src) {
        assets[key] = src;
      },
      clear: function() {
        assets = {};
      }
    }
  })();
  
  beforeEach(function() {
    TitleScreen = require("../spec_helper").FeedTheQuinn.TitleScreen;
    fakeAssets.clear();
    FeedTheQuinn.Assets = {"title": {"background": "backgroundImage.src"}};
  });

  it("loads the assets from the global assets map", function() {
    TitleScreen.load(fakeAssets);

    expect(fakeAssets.get("background")).toEqual("backgroundImage.src");
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
