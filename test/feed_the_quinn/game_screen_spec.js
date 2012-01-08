
describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      level = require('eskimo').Level; 

  afterEach(function() {
    sandbox.restore();
  });

  it("loads the levelOne on load", function() {
    var levelLoad = sandbox.stub(level, 'load'),
        game = require('../../script/feed_the_quinn/game_screen');

    game.load();

    levelLoad.calledWith('levelOne').should.be.true;
  });
});
