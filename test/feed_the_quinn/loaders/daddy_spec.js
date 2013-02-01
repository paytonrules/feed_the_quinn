var TestAssetLoader = require('eskimo').TestAssetLoader,
    DaddyLoader = require('../../../script/feed_the_quinn/loaders/daddy'),
    Daddy = require('../../../script/feed_the_quinn/daddy'),
    assert = require('assert'),
    sandbox = require('sinon').sandbox.create();

describe("Daddy Loader", function() {

  beforeEach(function() {
    sandbox.restore();
  });

  it("sends the daddy object through the callback", function() {
    var daddyLoader = DaddyLoader.create(TestAssetLoader),
        callback = sandbox.stub(),
        level = {
          'eric' : {
            'daddy' : {
              'stress' : 100,
              'location' : {
                'y' : 20
              }
            }
          }
        };

    daddyLoader.load(level, 'eric', 'level', callback);

    assert.equal(callback.args[0][0], 'eric');
    assert.equal(callback.args[0][1].stress(), 100);
    assert.equal(callback.args[0][1].top(), 20);
  });
});
