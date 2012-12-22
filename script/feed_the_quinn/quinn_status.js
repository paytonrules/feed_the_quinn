module.exports = {
  create: function(game) {
    var daddy = game.daddy;
    var keystate = game.keystate;
    var quinn = game.quinn;

    return {
      check: function(keystate) {
        if (daddy.location.x <= (quinn.location.x + quinn.boundingBox.width)
           && daddy.location.x >= quinn.location.x
           && daddy.location.y >= quinn.location.y
           && daddy.location.y <= (quinn.location.y + quinn.boundingBox.height)) {
          return keystate.spacebar;
        }
        return false;
      }
    }
  }
}
