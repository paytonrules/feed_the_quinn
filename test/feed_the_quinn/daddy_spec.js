describe("Daddy", function() {
  var Daddy = require('../../script/feed_the_quinn/daddy.js'),
      Sprite = require('eskimo').Sprite,
      sandbox = require('sinon').sandbox.create(),
      assert = require('assert');

  beforeEach(function() {
    sandbox.restore();
  });

  it("updates the stress level gradually on each update", function() {
    var daddy = Daddy.create({stressRate: 90});

    for(var i = 0; i < 90; i++) {
      daddy.update({});
    }

    assert.strictEqual(1, daddy.stress());
  });

  it("has a name", function() {
    var daddy = Daddy.create({name: "name"});

    assert.equal(daddy.name, "name");
  });

  it("delegates its draw to its sprite", function() {
    var draw = sandbox.stub();
    var daddy = Daddy.create({draw: draw });

    daddy.draw('context');

    assert.ok(draw.calledWith('context'));
  });

  it("delegates left to its sprite", function() {
    var daddy = Daddy.create({
      left: function() {
        return 10;
      }
    });

    assert.equal(10, daddy.left());
  });

  it("delegates right to its sprite", function() {
    var daddy = Daddy.create({
      right: function() {
        return 20;
      }
    });

    assert.equal(20, daddy.right());
  });

  it("delegates top to its sprite", function() {
    var daddy = Daddy.create({
      top: function() {
        return 30;
      }
    });

    assert.equal(30, daddy.top());
  });

  it("delegates bottom to its sprite", function() {
    var daddy = Daddy.create({
      bottom: function() {
        return 40;
      }
    });

    assert.equal(40, daddy.bottom());
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

  it("allows directly setting its sprites location", function() {
    var daddySprite = {location: {x: 20, y: 30}},
        daddy = Daddy.create(daddySprite);

    daddy.setLocation({x:1, y: 1});

    assert.strictEqual(daddySprite.location.x, 1);
    assert.strictEqual(daddySprite.location.y, 1);
  });

});
