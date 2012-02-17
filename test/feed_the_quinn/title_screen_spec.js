describe("TitleScreen", function() {
  var TitleScreen = require('../../script/feed_the_quinn/title_screen'), 
      StartButton = require('../../script/feed_the_quinn/start_button'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      screen, 
      should = require('should'),
      sinon = require('sinon'),
      Level = require('eskimo').Level,
      jquery = require('jquery'),
      levels,
      sandbox;

  beforeEach(function() {
    screen = {
      put: function() {}
    };
  
    // Maybe just use real assets ?
    Level.levels = {
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
    Level.initializeAssets(jquery);
    
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("loads the title screen images with this as the context", function() {
    TitleScreen.load();

    Level.gameObject('background').should.be.ok;
  });

  it("uses a jukebox to play the song", function() {
    var jukebox = require('eskimo').Jukebox();
    var jukeboxMock = sandbox.mock(jukebox);
    sandbox.stub(Level, "getJukebox", function() {
      return jukebox;
    });
    
    jukeboxMock.expects("play").once().withArgs('song');
   
    TitleScreen.load();

    TitleScreen.update();

    jukeboxMock.verify();
  });

  it("creates a start button on load", function() {
    var startButtonSpy = sandbox.spy(StartButton, 'create', function() {
      return {};
    });

    TitleScreen.load();

    startButtonSpy.args[0][0].should.eql({'location' : {'x' : 0, 'y' : 0}});
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

  function setupTitleScreenWithFakeButton() {
    var button = {
      click: function(location, callback) { 
        this.callback = callback; 
      }
    };
    sandbox.stub(StartButton, 'create', function() {
      return button;
    });

    TitleScreen.load();
    return button;
  }

  it("also sends a callback to the button, which when called sends an event to the state machine", function() {
    var stateMachine = {startGame: sandbox.stub()} 
    var button = setupTitleScreenWithFakeButton();

    TitleScreen.click(stateMachine, '');

    button.callback();

    stateMachine.startGame.called.should.be.true;
  });

  it("stops the song on click", function() {
    var jukebox = require('eskimo').Jukebox();
    var mockJukebox = sandbox.mock(jukebox);
    sandbox.stub(Level, "getJukebox", function() {
      return jukebox;
    });
    var button = setupTitleScreenWithFakeButton();

    mockJukebox.expects('stop').once(); 

    TitleScreen.click({startGame: sandbox.stub()}, '');

    button.callback();

    mockJukebox.verify();
  });

});
