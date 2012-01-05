describe("StartButton", function() {
  var StartButton = require("../../script/feed_the_quinn/start_button"),
      Image = require("eskimo").Image,
      should = require('should'),
      sm = StartButton.create({'location' : 
                                   { 'x' : 1, 'y' : 1}, 
                                 'images' : {
                                   'start_button' : { 'src' : 'imageName'}
                                 }
                               });
  beforeEach(function() {
    var jquery = require('jquery'),
        level = require('eskimo').Level;

    level.initializeAssets(jquery);
    level.addImage('start_button', jquery("<img src='bleh' height='20' width='20'></img>"));
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

    screen.shouldHaveImage(Image('start_button',  1, 1)); 
  });

  it("accepts a click, and calls the handler if the location is within the button", function() {
    var called = false;

    sm.click({x : 2, y : 3}, function() {
      called = true;
    });

    called.should.be.true;
  });

  it("doesn't make the callback if the click is to the left of the image", function() {
    var called = false;
   
    sm.click({x : 0, y : 3}, function() {
      called = true;
    });

    called.should.be.false;
  });

  it("doesn't make the callback if the click is to the right of the image", function() {
    var called = false;

    sm.click({x : 22, y: 3}, function() {
      called = true;
    });

    called.should.be.false;
  });
});
