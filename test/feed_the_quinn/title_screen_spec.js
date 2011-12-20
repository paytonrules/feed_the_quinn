describe("TitleScreen", function() {
  var TitleScreen = require('../../script/feed_the_quinn/title_screen'), 
      StartButton = require('../../script/feed_the_quinn/start_button'),
      screen, 
      should = require('should'),
      Spies = require('../spies'),
      LevelLoader = require('eskimo').LevelLoader,
      jquery = require('jquery'),
      levels;

  beforeEach(function() {
    screen = {
      put: function() {}
    };
  
    // Maybe just use real assets ?
    LevelLoader.levels = {
      "title" : {
        "background" : {
          'images': {
            'src': 'images/title_screen_background.jpg'
          },
          'sounds': {
            'song' : {
              'src': 'songs/The_Mighty_Quinn.MP3'
            }
          },
          'location': {
            'x': 20,
            'y': 4
          }
        },
        "start_button" : {
          'button' : 'data'
        }
      }
    };
    LevelLoader.initializeAssets(jquery);
  });

  it("loads the title screen images with this as the context", function() {
    TitleScreen.load();

    LevelLoader.gameObject('background').should.be.ok;
  });

  it("uses a jukebox to play the song", function() {
    var mockBox = {play: function(name) {}};
    var jukeboxSpy = Spies.spyOn(mockBox, "play");
    Spies.stub(LevelLoader, "getJukebox", mockBox);
    
    TitleScreen.load();

    TitleScreen.update();

    jukeboxSpy.passedArguments().should.eql({'0' : 'song'});
  });

  it("puts the background on the screen in the draw method", function() {
    var screenSpy = Spies.spyOn(screen, "put");
    Spies.stub(StartButton, "create", {draw: function() {}});

    TitleScreen.load();
    TitleScreen.draw(screen);

    var image = screenSpy.passedArguments()['0'];

    image.name.should.equal('background');
    image.x.should.equal(20);
    image.y.should.equal(4);
  });

  it("creates a start button on load", function() {
    var startButtonSpy = Spies.spyOn(StartButton, 'create', {draw: function() {}});

    TitleScreen.load();

    startButtonSpy.passedArguments().should.eql({'0' : {'button' : 'data' }});
  });

  it("draws the start button on draw", function() {
    var button = {draw: function(screen) { this.screen = screen; }};
    Spies.stub(StartButton, 'create', button);

    TitleScreen.load();
    TitleScreen.draw(screen);

    button.screen.should.eql(screen);
  });

  it("sends clicks to the button to see if you clicked it", function() {
    var button = {
      click: function(state_machine, event) { 
        this.state_machine = state_machine; 
        this.event = event; 
      }
    };
    Spies.stub(StartButton, 'create', button);

    TitleScreen.load();
    TitleScreen.click('state_machine', 'event');

    button.state_machine.should.equal('state_machine');
    button.event.should.equal('event');
  });

});
