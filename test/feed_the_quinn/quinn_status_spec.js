describe("Quinn Status", function() {
  var FedQuinnChecker = require("../../script/feed_the_quinn/quinn_status.js"),
      Assert = require('assert'),
      Sprite = require('eskimo').Sprite;

  it("returns false when quinn does not contain daddy", function() {
    var daddy = {location: { x: 140, y: 140} };
    var quinn = Sprite("", {location: { x: 0, y: 0}, 
                      asset: {width: 139, height: 139} });
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn
    });

    Assert.ok(!checker.check({spacebar: true}));
  });

  it("returns false when the daddy is within the objects bounding box but the spacebar is not pressed", function() {
    var daddy = {location: { x: 2, y: 3} };
    var quinn = Sprite("", {location: { x: 1, y: 2}, 
                       asset: {width: 10, height: 10} });
    
    var checker = FedQuinnChecker.create({
      daddy: daddy,
      quinn: quinn 
    });

    Assert.ok(!checker.check({spacebar: false}));
  });

  it("returns true when the spacebar is pressed and the quinn is in the bounding box", function() {
    var daddy = {location: { x: 11, y: 12} };
    var quinn = Sprite("", {location: { x: 1, y: 2}, 
                           asset: {width: 10, height: 10} });
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn
    });

    Assert.ok(checker.check({spacebar: true}));
  });

  it("is not close to quinn when daddy is to the left of quinn", function() {
    var daddy = {location: { x: 0, y: 12} };
    var quinn = Sprite("", {location: { x: 1, y: 2}, 
                           asset: {width: 10, height: 10} });
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn
    });

    Assert.ok(!checker.check({spacebar: true}));
  });

  it("is not close to quinn when daddy is above quinn", function() {
    var daddy = {location: { x: 2, y: 1} };
    var quinn = Sprite("", 
                      {location: { x: 1, y: 2}, 
                       asset: {width: 10, height: 10} });
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn
    });

    Assert.ok(!checker.check({spacebar: true}));
  });
  
  it("is not close to quinn when daddy is below quinn", function() {
    var daddy = {location: { x: 2, y: 13} };
    var quinn = Sprite("", 
                      {location: { x: 1, y: 2}, 
                       asset: {width: 10, height: 10} });
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn
    });

    Assert.ok(!checker.check({spacebar: true}));
  });

  it("allows the objects to move after they are set in the checker", function() {
    var daddy = {location: { x: 2, y: 13} };
    var quinn = Sprite("", 
                      {location: { x: 1, y: 2}, 
                       asset: {width: 10, height: 10} });
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn
    });

    daddy.location = {x: 1, y: 2};

    Assert.ok(checker.check({spacebar: true}));
  });
});
