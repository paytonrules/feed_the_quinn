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
        'backgroundMusic': {},
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

    var screen = new TitleScreen(gameSpec);
    return {screen: screen, button: button};
  }

  it("loads the title screen images for the title", function() {
    new TitleScreen(gameSpec, 'screen');

    assert.equal('title', gameSpec.levelName);
  });

  it("uses the jukebox from the gameSpec to play the song", function() {
    var jukeboxMock = gameSpec.mockJukebox();
    jukeboxMock.expects("play").once().withArgs('backgroundMusic');
     
    var screen = new TitleScreen(gameSpec, 'screen');
    screen.update();

    jukeboxMock.verify();
  });

  it("creates a start button on load", function() {
    var startButtonSpy = sandbox.spy(StartButton, 'create', function() {
      return {};
    });

    new TitleScreen(gameSpec, 'screen');

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

    var screen = new TitleScreen(gameSpec, 'screen');
    screen.click('state_machine', 'location');

    assert.equal(button.location, 'location');
  });

  it("also sends a callback to the button, which when called sends an event to the state machine", function() {
    var stateMachine = {startGame: sandbox.stub()} 
    var jukebox = { stop: function () {}};
    
    var buttonAndScreen = setupTitleScreenWithFakeButton(jukebox);
    var button = buttonAndScreen.button;
    var screen = buttonAndScreen.screen;

    screen.click(stateMachine, '');
    button.callback();

    assert(stateMachine.startGame.called);
  });

  it("stops the song on click", function() {
    var jukebox = require('eskimo').Jukebox();
    var mockJukebox = sandbox.mock(jukebox);
    var buttonAndScreen = setupTitleScreenWithFakeButton(jukebox);
    var button = buttonAndScreen.button;
    var screen = buttonAndScreen.screen;

    mockJukebox.expects('stop').once(); 

    screen.click({startGame: sandbox.stub()}, '');
    button.callback();

    mockJukebox.verify();
  });
});
