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

  it("loads the title screen images", function() {
    FeedTheQuinn.Assets = {
      'title': {
        'images': {
          'image': {'prop': 'for testing'}
        }
      }
    };

    var imageList;    
    spyOn(screen, "loadScreen").andCallFake(function(json) {
      imageList = json;
    });
    
    TitleScreen.load(fakeAssets, screen);

    expect(imageList.images.image.prop).toEqual('for testing');
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
