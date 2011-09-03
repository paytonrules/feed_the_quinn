describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, fakeAssets, screen;

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
    screen = new Eskimo.Screen([{getContext: function() {}}]);
    spyOn(Eskimo, "Jukebox").andReturn(mockBox);
    spyOn(mockBox, "play");
  });

  it("loads the background asset from the global assets map", function() {
    TitleScreen.load(fakeAssets, screen);

    expect(fakeAssets.images.get("background")).toEqual("backgroundImage.src");
  });

  it("puts the background on the screen", function() {
    var image;
    spyOn(screen, "put").andCallFake(function(theImage) {
      image = theImage;
    });

    TitleScreen.load(fakeAssets, screen);

    expect(image.name).toEqual('background');
    expect(image.x).toEqual(0);
    expect(image.y).toEqual(0);
  });

  it("loads the title song from the assets", function() {
    FeedTheQuinn.Assets = {"title": {"song": "song.mp3"}};
    TitleScreen.load(fakeAssets, screen);

    expect(fakeAssets.sounds.get("song")).toEqual("song.mp3");
  });

  it("uses a jukebox to play the song", function() {
    TitleScreen.load(fakeAssets, screen);
    TitleScreen.update();

    expect(mockBox.play).toHaveBeenCalled();
  });

});
