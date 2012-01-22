
describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      level = eskimo.Level,
      KeyCodes = eskimo.KeyCodes,
      game = require('../../script/feed_the_quinn/game_screen');

  afterEach(function() {
    sandbox.restore();
  });

  it("loads the levelOne on load", function() {
    var levelLoad = sandbox.stub(level, 'load');

    game.load();

    levelLoad.calledWith('levelOne').should.be.true;
  });

  it("moves the daddy object PLAYER_VELOCITY left", function() {
    level.initializeAssets(require('jquery'));
    level.levels = { 'levelOne' : {}};
    level.load('levelOne');
    level.addGameObject('daddy', {location: {x: 10}});
    game.moveLeft();
    game.update();

    var daddy = level.gameObject("daddy");

    daddy.location.x.should.eql(10 - game.PLAYER_VELOCITY);
  });

  it("keeps moving the daddy object left until stop moving left is sent", function() {
    level.initializeAssets(require('jquery'));
    level.levels = { 'levelOne' : {}};
    level.load('levelOne');
    level.addGameObject('daddy', {location: {x: 10}});
    game.moveLeft();
    game.update();
    game.update();
    
    var daddy = level.gameObject("daddy");

    daddy.location.x.should.eql(10 - (2 * game.PLAYER_VELOCITY));
  });
});
