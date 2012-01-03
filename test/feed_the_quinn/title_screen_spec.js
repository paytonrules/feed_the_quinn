describe("TitleScreen", function() {
  var TitleScreen = require('../../script/feed_the_quinn/title_screen'), 
      StartButton = require('../../script/feed_the_quinn/start_button'),
      screen, 
      should = require('should'),
      sinon = require('sinon'),
      LevelLoader = require('eskimo').LevelLoader,
      jquery = require('jquery'),
      levels,
      sandbox;

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
          'location' : {
            'x' : 0,
            'y' : 0
          }
        }
      }
    };
    LevelLoader.initializeAssets(jquery);
    
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("loads the title screen images with this as the context", function() {
    TitleScreen.load();

    LevelLoader.gameObject('background').should.be.ok;
  });

  it("uses a jukebox to play the song", function() {
    var mockBox = {play: function(name) {}};
    var jukeboxSpy = sandbox.mock(mockBox);
    sandbox.stub(LevelLoader, "getJukebox", function() {
      return mockBox;
    });
    
    jukeboxSpy.expects("play").once().withArgs('song');
   
    TitleScreen.load();

    TitleScreen.update();

    jukeboxSpy.verify();
  });

  it("puts the background on the screen in the draw method", function() {
    sandbox.stub(StartButton, 'create', function() {
      return {draw: function() {}};
    });
    var screenSpy = sandbox.spy(screen, 'put');

    TitleScreen.load();
    TitleScreen.draw(screen);

    var image = screenSpy.args[0][0];

    image.name.should.equal('background');
    image.x.should.equal(20);
    image.y.should.equal(4);
  });

  it("creates a start button on load", function() {
    var startButtonSpy = sandbox.spy(StartButton, 'create', function() {
      return {draw: function() {}};
    });

    TitleScreen.load();

    startButtonSpy.args[0][0].should.eql({'location' : {'x' : 0, 'y' : 0}});
  });

  it("draws the start button on draw", function() {
    var button = {draw: function(screen) { this.screen = screen; }};
    sandbox.stub(StartButton, 'create', function() {
      return button;
    });

    TitleScreen.load();
    TitleScreen.draw(screen);

    button.screen.should.eql(screen);
  });

  it("sends clicks to the button and their location", function() {
    var button = {
      click: function(location, callback) { 
        this.location = location; 
      }
    };
    sandbox.stub(StartButton, 'create', function() {
      return button;
    });

    TitleScreen.load();
    TitleScreen.click('state_machine', 'location');

    button.location.should.equal('location');
  });

  it("also sends a callback to the button, which when called sends an event to the state machine", function() {
    var state_machine = {start_game: function() {this.started = true;}};
    var button = {
      click: function(location, callback) { 
        this.callback = callback; 
      }
    };
    sandbox.stub(StartButton, 'create', function() {
      return button;
    });

    TitleScreen.load();
    TitleScreen.click(state_machine, '');

    button.callback();

    state_machine.started.should.be.true;
  });

});
