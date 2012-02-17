describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      level = eskimo.Level,
      KeyCodes = eskimo.KeyCodes,
      game = require('../../script/feed_the_quinn/game_screen');

  function setupLevelWithDaddy() {
    level.initializeAssets(require('jquery'));
    level.levels = { 'levelOne' : {}};
    level.load('levelOne');
    level.addGameObject('daddy', {location: {x: 10}});
  }

  afterEach(function() {
    sandbox.restore();
  });

  it("loads the levelOne on load", function() {
    var levelLoad = sandbox.stub(level, 'load');
    sandbox.stub(level, 'gameObject', function() {
      return {};
    });

    game.load();

    levelLoad.calledWith('levelOne').should.be.true;
  });

  it("moves the daddy object PLAYER_VELOCITY*value horizontally", function() {
    setupLevelWithDaddy();
    game.load();
    game.moveHoriz(-1);
    game.update();

    var daddy = level.gameObject("daddy");

    daddy.location.x.should.eql(10 - game.PLAYER_VELOCITY);
  });

  it("keeps moving the daddy object left until stop moving left is sent", function() {
    setupLevelWithDaddy();
    game.load();
    game.moveHoriz(-1);
    game.update();
    game.update();
    
    var daddy = level.gameObject("daddy");

    daddy.location.x.should.eql(10 - (2 * game.PLAYER_VELOCITY));
  });

  it("doesnt move more than maximum velocity horizontally", function() {
    setupLevelWithDaddy();
    game.load();
    game.moveHoriz(1);
    game.moveHoriz(1);
    game.update();

    var daddy = level.gameObject("daddy");

    daddy.location.x.should.eql(10 + game.PLAYER_VELOCITY);
  });
   
});
