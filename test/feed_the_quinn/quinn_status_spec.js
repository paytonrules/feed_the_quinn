describe("Quinn Status", function() {
  var FedQuinnChecker = require("../../script/feed_the_quinn/quinn_status.js");
  var Assert = require('assert');

  it("returns false when the daddy is not near the quinn", function() {
    var daddy = {location: { x: 140, y: 140} };
    var quinn = {location: { x: 0, y: 0}, boundingBox: {width: 139, height: 139} };
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn, 
      keystate: {spacebar: true}
    });

    Assert.ok(!checker.check());
  });

  it("returns false when the daddy is within the objects bounding box but the spacebar is not pressed", function() {
    var daddy = {location: { x: 2, y: 3} };
    var quinn = {location: { x: 1, y: 2}, boundingBox: {width: 10, height: 10} };
    
    var checker = FedQuinnChecker.create({
      daddy: daddy,
      quinn: quinn, 
      keystate: {spacebar: false}
    });

    Assert.ok(!checker.check());
  });

  it("returns true when the spacebar is pressed and the quinn is in the bounding box", function() {
    var daddy = {location: { x: 11, y: 12} };
    var quinn = {location: { x: 1, y: 2}, boundingBox: {width: 10, height: 10} };
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn,
      keystate: {spacebar: true}
    });

    Assert.ok(checker.check());
  });

  it("is not close to quinn when daddy is to the left of quinn", function() {
    var daddy = {location: { x: 0, y: 12} };
    var quinn = {location: { x: 1, y: 2}, boundingBox: {width: 10, height: 10} };
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn,
      keystate: {spacebar: true}
    });

    Assert.ok(!checker.check());
  });

  it("is not close to quinn when daddy is above quinn", function() {
    var daddy = {location: { x: 2, y: 1} };
    var quinn = {location: { x: 1, y: 2}, boundingBox: {width: 10, height: 10} };
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn,
      keystate: {spacebar: true}
    });

    Assert.ok(!checker.check());
  });
  
  it("is not close to quinn when daddy is below quinn", function() {
    var daddy = {location: { x: 2, y: 13} };
    var quinn = {location: { x: 1, y: 2}, boundingBox: {width: 10, height: 10} };
    
    var checker = FedQuinnChecker.create({ 
      daddy: daddy, 
      quinn: quinn,
      keystate: {spacebar: true}
    });

    Assert.ok(!checker.check());
  });
});
