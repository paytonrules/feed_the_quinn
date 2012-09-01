describe("TitleScreen", function() { var TitleScreen = require('../../script/feed_the_quinn/title_screen'), 
      StartButton = require('../../script/feed_the_quinn/start_button'),
      assert = require('assert'),
      sinon = require('sinon'),
      gameSpec,
      sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    var levels = {
      "title" : {
        "background" : {
          'image': {
            'src': 'images/title_screen_background.jpg'
            },
          'location': {
            'x': 20,
            'y': 4
          },
        },
        'backgroundMusic': {
          'sound' : {
            'src': 'songs/The_Mighty_Quinn.MP3'
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

    var jukebox = require('eskimo').Jukebox();
    var mockJukebox = sandbox.mock(jukebox);
    gameSpec = {
      mockJukebox: function() { return mockJukebox; },
      load: function(name, func) {
        this.levelName = name;
        func({
          getJukebox: function() {return jukebox;},
          gameObject: function(objectName) {
            return levels[name][objectName];
          },
          levelName: name
        });
      }
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  function setupTitleScreenWithFakeButton(jukebox) {
    var button = {
      click: function(location, callback) { 
        this.callback = callback; 
      }
    };
    var gameSpec = {
      getJukebox: function() { return jukebox; },
      gameObject: function() {},
      load: function(name, func) {
        func(this);
      }
    };

    sandbox.stub(StartButton, 'create', function() {
      return button;
    });

    TitleScreen.load(gameSpec);
    return button;
  }

  it("loads the title screen images for the title", function() {
    TitleScreen.load(gameSpec, 'screen');

    assert.equal('title', gameSpec.levelName);
  });

  it("uses the jukebox from the gameSpec to play the song", function() {
    var jukeboxMock = gameSpec.mockJukebox();
    jukeboxMock.expects("play").once().withArgs('backgroundMusic');
     
    TitleScreen.load(gameSpec, 'screen');
    TitleScreen.update();

    jukeboxMock.verify();
  });

  it("creates a start button on load", function() {
    var startButtonSpy = sandbox.spy(StartButton, 'create', function() {
      return {};
    });

    TitleScreen.load(gameSpec);

    assert.deepEqual(startButtonSpy.args[0][0], {'location' : {'x' : 0, 'y' : 0}});
  });

  it("sends clicks to the start button and their location", function() {
    var button = {
      click: function(location, callback) { 
        this.location = location; 
      }
    };
    var jukeboxMock = gameSpec.mockJukebox();
    jukeboxMock.expects("stop");
    sandbox.stub(StartButton, 'create', function() { 
      return button;
    });

    TitleScreen.load(gameSpec);
    TitleScreen.click('state_machine', 'location');

    assert.equal(button.location, 'location');
  });

  it("also sends a callback to the button, which when called sends an event to the state machine", function() {
    var stateMachine = {startGame: sandbox.stub()} 
    var jukebox = { stop: function () {}};
    var button = setupTitleScreenWithFakeButton(jukebox);

    TitleScreen.click(stateMachine, '');

    button.callback();

    assert(stateMachine.startGame.called);
  });

  it("stops the song on click", function() {
    var jukebox = require('eskimo').Jukebox();
    var mockJukebox = sandbox.mock(jukebox);
    var button = setupTitleScreenWithFakeButton(jukebox);

    mockJukebox.expects('stop').once(); 

    TitleScreen.click({startGame: sandbox.stub()}, '');

    button.callback();

    mockJukebox.verify();
  });
});
