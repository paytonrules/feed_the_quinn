describe("FeedTheQuinn.TitleScreen", function() {
  var TitleScreen, 
      fakeAssets, 
      screen, 
      should = require('should'),
      LevelLoader = require('eskimo').LevelLoader,
      Spies = require('../spies'),
      levels;

  fakerssets = (function() { 
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
   
    screen = {
      put: function() {}
    };
  });

  it("loads the title screen images with this as the context", function() {
    var levelLoaderSpy = Spies.spyOn(LevelLoader, 'load');

    TitleScreen.load(screen);

    levelLoaderSpy.passedArguments().should.eql({'0' : 'title', '1' : TitleScreen});
  });

  it("uses a jukebox to play the song", function() {
    var mockBox = {play: function(name) {}};
    var jukeboxSpy = Spies.spyOn(mockBox, "play");
    Spies.stub(LevelLoader, "getJukebox", mockBox);
    
    TitleScreen.load(screen);
    TitleScreen.update();

    jukeboxSpy.passedArguments().should.eql({'0' : 'song'});
  });

  it("puts the background on the screen in the load method", function() {
    var screenSpy = Spies.spyOn(screen, "put");

    TitleScreen.load(screen);

    var image = screenSpy.passedArguments()['0'];

    image.name.should.equal('background');
    image.x.should.equal(0);
    image.y.should.equal(0);
  });

});
