describe("TitleScreen", function() { 
  var TitleScreen = require('../../script/feed_the_quinn/title_screen'), 
      TestGameSpecFactory = require('eskimo').TestGameSpecFactory,
      StartButton = require('../../script/feed_the_quinn/start_button'),
      assert = require('assert'),
      sinon = require('sinon'),
      sandbox,
      gameSpec,
      levels = {
        "title" : {
          'backgroundMusic': {},
          "start_button" : {
            'sprite' : {
              'location' : {
                'x' : 0,
                'y' : 0
              }
            }
          }
        }
      };

  beforeEach(function() {
    gameSpec = TestGameSpecFactory.create(levels);
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("uses the jukebox from the gameSpec to play the song", function() {
    var screen = new TitleScreen({spec: gameSpec, screen: 'screen'});
    screen.update();

    assert.ok(gameSpec.level().playedSound("backgroundMusic"));
  });

  it("creates a start button on load", function() {
    var startButtonSpy = sandbox.spy(StartButton, 'create', function() {
      return {};
    });

    new TitleScreen({spec: gameSpec, screen: 'screen'});

    assert.deepEqual(startButtonSpy.args[0][0].location, {'x' : 0, 'y' : 0});
  });

  function setupButton() {
    var button = {
      click: function(location, callback) { 
        this.location = location; 
        this.callback = callback; 
      }
    };
    sandbox.stub(StartButton, 'create', function() { 
      return button;
    });
    return button;
  }

  it("sends clicks to the start button and their location", function() {
    var button = setupButton();
    var screen = new TitleScreen({spec: gameSpec, screen: 'screen'});

    screen.click('state_machine', 'location');

    assert.equal(button.location, 'location');
  });

  it("also sends a callback to the button, which when called sends an event to the state machine", function() {
    var button = setupButton();
    var stateMachine = {startGame: sandbox.stub()} ;
    var screen = new TitleScreen({spec: gameSpec, screen: 'screen'});

    screen.click(stateMachine, '');
    button.callback();

    assert.ok(stateMachine.startGame.called);
  });

  it("stops the song on click", function() {
    var button = setupButton();
    var screen = new TitleScreen({spec: gameSpec, screen: 'screen'});

    screen.click('state_machine', 'location');

    assert.ok(gameSpec.level().stoppedSound('backgroundMusic'));
  });
});
