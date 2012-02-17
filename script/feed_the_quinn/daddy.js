var Daddy = module.exports = {
  create: function(gameObject) {
    
    function update(keystate) {
      if (keystate.left) {
        gameObject.location.x -= Daddy.PLAYER_VELOCITY;
      }

      if (keystate.right) {
        gameObject.location.x += Daddy.PLAYER_VELOCITY;
      }

      if (keystate.up) {
        gameObject.location.y -= Daddy.PLAYER_VELOCITY;
      }

      if (keystate.down) {
        gameObject.location.y += Daddy.PLAYER_VELOCITY;
      }
    };

    return {
      update: update
    };
  },
  PLAYER_VELOCITY: 5
};
