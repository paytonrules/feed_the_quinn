describe("Progress Bar", function() {
  var ProgressBar = require('../../script/feed_the_quinn/progress_bar'),
      Assert = require('assert'),
      sandbox = require('sinon').sandbox.create();

  afterEach(function() {
    sandbox.restore();
  });

  it("is created with a name", function() {
    var bar = ProgressBar.create("blah", {});

    Assert.equal(bar.name, "blah");
  });

  it("updates its stress", function() {
    var a = {};
    var bar = ProgressBar.create("blah", a);

    bar.update(40);
    
    Assert.equal(a.stress, 40);
  });

  it("draws the image with its asset, location, and width and height", function() {
    var Canvas = require('canvas');
    var canvas = new Canvas(100, 200);
    var context = canvas.getContext('2d');
    var contextStub = sandbox.stub(context, 'drawImage');
    var image = new Canvas.Image;
    image.src = canvas.toBuffer();
    var bar = ProgressBar.create("bar", {location: {x: 10, y: 20},
                                        asset: image});

    bar.draw(context);

    Assert.ok(contextStub.calledWith(image, 0, 0, 0, 200, 10, 20, 0, 200));
  });

  it("scales the width to the full width when stress is at 100", function() {
    var Canvas = require('canvas');
    var canvas = new Canvas(100, 200);
    var context = canvas.getContext('2d');
    var contextStub = sandbox.stub(context, 'drawImage');
    var image = new Canvas.Image;
    image.src = canvas.toBuffer();
    var bar = ProgressBar.create("blah", {location: {x: 0, y: 0}, asset: image});

    bar.update(100);

    bar.draw(context);

    Assert.ok(contextStub.calledWith(image, 0, 0, 100, 200, 0, 0, 100, 200));
  });

});

