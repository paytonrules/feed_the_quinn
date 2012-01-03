describe("StartButton", function() {
  var StartButton = require("../../script/feed_the_quinn/start_button"),
      Image = require("eskimo").Image,
      should = require('should'),
      sm = StartButton.create({'location' : 
                                   { 'x' : 1, 'y' : 2}, 
                                 'images' : {
                                   'start_button' : { 'src' : 'imageName'}
                                 }
                               });
  it("draws on the screen", function() {
    var screen = {
      put: function(image) {
        this.image = image;
      },
      shouldHaveImage: function(image) {
        this.image.name.should.equal(image.name);
        this.image.x.should.equal(image.x);
        this.image.y.should.equal(image.y);
      }
    };
        
    sm.draw(screen);

    screen.shouldHaveImage(Image('start_button',  1, 2)); 
  });

  it("accepts a click, and calls the handler if the location is within the button", function() {
    var sm = StartButton.create({'location' : {'x' : 1, 'y' : 2}}),
        called;
    

    sm.click({x : 2, y : 3}, function() {
      called = true;
    });

    called.should.be.true;
  });

  it("doesn't call the handler if the image is to the left of the bounding box", function() {
     var sm = StartButton.create({'location' : {'x' : 1, 'y' : 2}}),
        called = false;

    // This location returns false to isInBoundingBox
    sm.click({x : 3, y : 4}, function() {
      called = true;
    });

    called.should.be.false;
  });
});
