describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, fakeAssets;

  fakeAssets = (function() { 
    var imageAssets = {},
        soundAssets = {},
        mockBox;
    
    return {
      images: {
        get: function(key) {
          return imageAssets[key];
        },
        load: function(key, src) {
          imageAssets[key] = src;
        }
      },
      sounds: {
        get: function(key) {
          return soundAssets[key];
        },
        load: function(key, src) {
          soundAssets[key] = src;
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
    
    mockBox = Eskimo.Jukebox('');
    spyOn(Eskimo, "Jukebox").andReturn(mockBox);
    spyOn(mockBox, "play");

  });

  it("loads the assets from the global assets map", function() {
    TitleScreen.load(fakeAssets);

    expect(fakeAssets.images.get("background")).toEqual("backgroundImage.src");
  });

  it("adds the background to the image list", function() {
    imageList = [];

    TitleScreen.load(fakeAssets);
    TitleScreen.update(imageList);

    expect(imageList[0].name).toEqual('background');
    expect(imageList[0].location.x).toEqual(0);
    expect(imageList[0].location.y).toEqual(0);
  });

  it("loads the title song from the assets", function() {
    FeedTheQuinn.Assets = {"title": {"song": "song.mp3"}};
    TitleScreen.load(fakeAssets);

    expect(fakeAssets.sounds.get("song")).toEqual("song.mp3");
  });

  it("uses a jukebox to play the song", function() {
    TitleScreen.load(fakeAssets);
    TitleScreen.update(imageList);

    expect(mockBox.play).toHaveBeenCalled();
  });

});
