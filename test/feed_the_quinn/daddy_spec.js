
describe("Daddy", function() {
  var Daddy = require('../../script/feed_the_quinn/daddy.js'),
      assert = require('assert');

  it("updates the stress level gradually on each update", function() {
    var daddy = Daddy.create({stressRate: 90});

    for(var i = 0; i < 90; i++) {
      daddy.update({});
    }

    assert.strictEqual(1, daddy.stress);
  });

  it("dies when it reaches maxStress", function() {
    var daddy = Daddy.create({stressRate: 1, maxStress: 3});

    for(var j = 0; j < 3; j++) {
      daddy.update({});
    }

    assert.ok(daddy.isDead);
  });

  it("is not dead before it reaches maxStress", function() {
    var daddy = Daddy.create({stressRate: 1, maxStress: 3});

    for(var j = 0; j < 2; j++) {
      daddy.update({});
    }
    assert.strictEqual(false, daddy.isDead);
  });

  it("does not change the location on update if it hasnt been moved yet", function() {
    var daddyGameObject = {location: {x: 0, y: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({left: false, right: false, up: false, down: false});

    assert.strictEqual(daddyGameObject.location.x, 0);
    assert.strictEqual(daddyGameObject.location.y, 0);
  });

  it("moves left velocity when left button is pressed", function() {
    var daddyGameObject = {location: {x: 0}, velocity: 1 };
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({left: true});

    assert.strictEqual(daddyGameObject.location.x, -1);
  });

  it("moves right velocity when right button is pressed", function() {
    var daddyGameObject = {location: {x: 0}, velocity: 1};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({right: true});

    assert.strictEqual(daddyGameObject.location.x, 1);
  });

  it("Moves nowhere when left and right buttons are pressed", function() {
    var daddyGameObject = {location: {x: 0}, velocity: 1};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({left: true, right: true});

    assert.strictEqual(daddyGameObject.location.x, 0);
  });

  it("Moves up when up is pressed", function() {
    var daddyGameObject = {location: {y: 0}, velocity: 1};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({up: true});

    assert.strictEqual(daddyGameObject.location.y, -1);
  });

  it("Moves down when down is pressed", function() {
    var daddyGameObject = {location: {y: 0}, velocity: 1};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({down: true});

    assert.strictEqual(daddyGameObject.location.y, 1);
  });

  it("Goes nowhere when down and up are pressed", function() {
    var daddyGameObject = {location: {y: 0}, velocity: 1};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({up: true, down: true});

    assert.strictEqual(daddyGameObject.location.y, 0);
  });

});
