describe("FeedTheQuinn#Text", function() {
  var sandbox = require('sinon').sandbox.create(),
      Canvas = require('canvas'),
      canvas = new Canvas(),
      context = canvas.getContext('2d'),
      assert = require('assert'),
      Text = require('../../script/feed_the_quinn/text');

  beforeEach(function() {
    sandbox.restore();
  });

  it("draws the text at the location of the object it monitors", function() {
    var canvasSpy = sandbox.spy(context, 'fillText');

    var text = Text.create({location: {x: 10, y: 20}, score: 10}, 'score');
    text.draw(context);

    assert.ok(canvasSpy.calledWith(10, 10, 20));
  });

  it("uses the passed in fillstyle", function() {
    var text = Text.create({fillStyle: 'red', location: {}});
    text.draw(context);

    assert.equal(context.fillStyle, '#ff0000');
  });

  it("uses the passed in font", function() {
    var text = Text.create({font: 'italic 40px Calibri', location: {}});
    text.draw(context);

    assert.equal(context.font, 'italic 40px Calibri');
  });

  it("is bound to a piece of data to draw", function() {
    var canvasSpy = sandbox.spy(context, 'fillText');

    var text = Text.create({score: 40, location: {}}, 'score');
    text.draw(context);

    assert.ok(canvasSpy.calledWith(40));
  });
});
