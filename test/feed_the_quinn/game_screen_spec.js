describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      level = eskimo.Level,
      Keyboard = eskimo.Keyboard,
      should = require('should'),
      game = require('../../script/feed_the_quinn/game_screen'),
      Daddy = require("../../script/feed_the_quinn/daddy.js");

  function setupLevelWithDaddy() {
    level.initializeAssets(require('jquery'));
    level.levels = { 'levelOne' : {}};
    level.load('levelOne');
    level.addGameObject('daddy', {location: {x: 10}});
  }

  afterEach(function() {
    sandbox.restore();
  });

  describe("load", function() {
    var levelLoad;
  
    beforeEach(function() {
      levelLoad = sandbox.stub(level, 'load');
      sandbox.stub(level, 'gameObject', function() {
        return 'daddy object';
      });
    });

    // Note - should add a test method to the level and say "is this level loaded?"
    it("loads the levelOne on load", function() {
      game.load();

      levelLoad.calledWith('levelOne').should.be.true;
    });

    it("sends updates to the daddy in the load", function() {
      var daddyMock = sandbox.spy(Daddy, 'create');

      game.load();

      daddyMock.calledWith('daddy object').should.be.true;
    });
  });

  describe("update", function() {
    var daddy,
        daddyMock;
    
    beforeEach(function() {
      daddy = Daddy.create();
      game.setDaddy(daddy);

      daddyMock = sandbox.mock(daddy);
    });

    it("updates the daddy with the keystate when something is pressed", function() {
      daddyMock.expects('update').withArgs({left: true});

      game.keydown({which: Keyboard.LEFT_ARROW});
      game.update();

      daddyMock.verify();
    });

    it("doesnt change the key state until a keyup is sent", function() {
      daddyMock.expects('update').twice().withArgs({left: true});

      game.keydown({which: Keyboard.LEFT_ARROW});
      game.update();
      game.update();

      daddyMock.verify();
    });

    it("Stops moving left on a keyup", function() {
      daddyMock.expects('update').withArgs({left: true});
      daddyMock.expects('update').withArgs({left: false});
      
      game.keydown({which: Keyboard.LEFT_ARROW});
      game.update();
      game.keyup({which: Keyboard.LEFT_ARROW});
      game.update();

      daddyMock.verify();
    });
  });
});
