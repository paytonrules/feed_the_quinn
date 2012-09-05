
describe("Daddy", function() {
  var Daddy = require('../../script/feed_the_quinn/daddy.js'),
      assert = require('assert');

  it("updates the stress level gradually on each update", function() {
    var daddy = Daddy.create({});

    for(var i = 0; i < Daddy.STRESS_RATE; i++) {
      daddy.update({});
    }

    assert.strictEqual(1, daddy.stress);
  });

  it("dies when it reaches MAX_STRESS", function() {
    var daddy = Daddy.create({});

    for(var j = 0; j < Daddy.MAX_STRESS; j++) {
      for(var i = 0; i < Daddy.STRESS_RATE; i++) {
        daddy.update({});
      }
    }

    assert.ok(daddy.isDead);
  });

  it("is not dead before it reaches MAX_STRESS", function() {
    var daddy = Daddy.create({});

    assert.strictEqual(false, daddy.isDead);
  });

  it("does not change the location on update if it hasnt been moved yet", function() {
    var daddyGameObject = {location: {x: 0, y: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({left: false, right: false, up: false, down: false});

    assert.strictEqual(daddyGameObject.location.x, 0);
    assert.strictEqual(daddyGameObject.location.y, 0);
  });

  it("moves left PLAYER_VELOCITY when left button is pressed", function() {
    var daddyGameObject = {location: {x: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({left: true});

    assert.strictEqual(daddyGameObject.location.x, -Daddy.PLAYER_VELOCITY);
  });

  it("moves right PLAYER_VELOCITY when right button is pressed", function() {
    var daddyGameObject = {location: {x: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({right: true});

    assert.strictEqual(daddyGameObject.location.x, Daddy.PLAYER_VELOCITY);
  });

  it("Moves nowhere when left and right buttons are pressed", function() {
    var daddyGameObject = {location: {x: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({left: true, right: true});

    assert.strictEqual(daddyGameObject.location.x, 0);
  });

  it("Moves up when up is pressed", function() {
    var daddyGameObject = {location: {y: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({up: true});

    assert.strictEqual(daddyGameObject.location.y, -Daddy.PLAYER_VELOCITY);
  });

  it("Moves down when down is pressed", function() {
    var daddyGameObject = {location: {y: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({down: true});

    assert.strictEqual(daddyGameObject.location.y, Daddy.PLAYER_VELOCITY);
  });

  it("Goes nowhere when down and up are pressed", function() {
    var daddyGameObject = {location: {y: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update({up: true, down: true});

    assert.strictEqual(daddyGameObject.location.y, 0);
  });

});
