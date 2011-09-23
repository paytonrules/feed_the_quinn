describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, fakeAssets, screen, levels;

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
  
    spyOn(Eskimo.LevelLoader, 'load');
   
    screen = {
      put: function() {}
    };

    this.addMatchers({
      toHaveBeenCalledWithImage: function(imageDocLiteral) {
        var actual = this.actual.argsForCall[0][0];
        return actual.name === imageDocLiteral.name &&
               actual.x === imageDocLiteral.x &&
               actual.y === imageDocLiteral.y;
      }
    });

  });

  it("loads the title screen images with this as the context", function() {
    TitleScreen.load(screen);

    expect(Eskimo.LevelLoader.load).toHaveBeenCalledWith('title', TitleScreen);
  });

  it("uses a jukebox to play the song", function() {
    var mockBox = {play: function(name) {}};
    spyOn(mockBox, "play");
    spyOn(Eskimo.LevelLoader, "getJukebox").andReturn(mockBox);
    
    TitleScreen.load(screen);
    TitleScreen.update();

    expect(mockBox.play).toHaveBeenCalledWith('song');
  });

  it("puts the background on the screen in the load method", function() {
    spyOn(screen, "put");

    TitleScreen.load(screen);

    expect(screen.put).toHaveBeenCalledWithImage({name: "background",
                                                  x: 0,
                                                  y: 0 });
  });

});
