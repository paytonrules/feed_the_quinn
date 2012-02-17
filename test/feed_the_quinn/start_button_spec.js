describe("StartButton", function() {
  var StartButton = require("../../script/feed_the_quinn/start_button"),
      Image = require("eskimo").Image,
      should = require('should'),
      sm;
  
  beforeEach(function() {
    var jquery = require('jquery');
    var image = jquery("<img src='bleh' height='20' width='20'></img>")[0];
    sm = StartButton.create({asset: image,
                             location : {x: 1, y: 1}});
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

  it("doesn't make the callback if the click below the image", function() {
    var called = false;

    sm.click({x :2, y: 22}, function() {
      called = true;
    });

    called.should.be.false;
  });

  it("doesn't make the call back if the click is above the image", function() {
    var called = false;

    sm.click({x :2, y: 0}, function() {
      called = true;
    });

    called.should.be.false;
  });

});
