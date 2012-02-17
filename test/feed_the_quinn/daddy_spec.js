
describe("Daddy", function() {
  var Daddy = require('../../script/feed_the_quinn/daddy.js'),
      should = require('should');

  it("does not change the location on update if it hasnt been moved yet", function() {
    var daddyGameObject = {location: {x: 0, y: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.update();

    daddyGameObject.location.x.should.eql(0);
    daddyGameObject.location.y.should.eql(0);
  });

  it("moves left PLAYER_VELOCITY when moving in the left direction", function() {
    var daddyGameObject = {location: {x: 0}};
    var daddy = Daddy.create(daddyGameObject);

    daddy.moveHoriz(-1);
    daddy.update();

    daddyGameObject.location.x.should.eql(-Daddy.PLAYER_VELOCITY);
  });

});
