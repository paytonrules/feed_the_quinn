module.exports = {
  create: function(game) {
    var daddy = game.daddy;
    var keystate = game.keystate;
    var quinn = game.quinn;

    return {
      check: function(keystate) {
        if (quinn.contains(daddy.location.x, daddy.location.y)) {
          return keystate.spacebar;
        }
        return false;
      }
    }
  }
}
