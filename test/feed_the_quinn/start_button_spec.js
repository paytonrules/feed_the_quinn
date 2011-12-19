describe("StartButton", function() {
  var StartButton = require("../../script/feed_the_quinn/start_button"),
      Image = require("eskimo").Image,
      should = require('should');

  it("draws on the screen", function() {
    var sm = StartButton.create({'location' : 
                                   { 'x' : 1, 'y' : 2}, 
                                 'images' : {
                                   'start_button' : { 'src' : 'imageName'}
                                 }
                                });
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


});
