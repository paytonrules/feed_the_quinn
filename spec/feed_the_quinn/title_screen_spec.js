describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, fakeAssets, screen;

  fakeAssets = (function() { 
    var soundAssets = {},
        mockBox;
    
    return {
       sounds: {
        get: function(key) {
          return soundAssets[key];
        },
        load: function(key, src) {
          soundAssets[key] = src;
        }
      }
    };
  })();
  
  beforeEach(function() {
    TitleScreen = require("../spec_helper").FeedTheQuinn.TitleScreen;
    FeedTheQuinn.Assets = {"title": {"background": "backgroundImage.src"}};
  
    // Change to a real screen  
    screen = {
      loadScreen: function(assets, context) {
      }
    };
    
    mockBox = Eskimo.Jukebox('');
    spyOn(Eskimo, "Jukebox").andReturn(mockBox);
    spyOn(mockBox, "play");
  });

  it("loads the title screen images with this as the context", function() {
    spyOn(screen, "loadScreen");
    
    FeedTheQuinn.Assets = {
      'title': {
        'image': {'prop': 'for testing'}
      }
    };

    TitleScreen.load(fakeAssets, screen);

    expect(screen.loadScreen).toHaveBeenCalledWith(FeedTheQuinn.Assets['title'], TitleScreen);
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
