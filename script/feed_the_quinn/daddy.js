var Daddy = module.exports = {
  create: function(gameObject) {
    var stressTicks = 0;
    
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

      stressTicks++;

      if (stressTicks % Daddy.STRESS_RATE == 0) {
        this.stress++;
      }
      
      if (this.stress >= Daddy.MAX_STRESS) {
        this.isDead = true;
      }
    }

    return {
      update: update,
      stress: 0,
      isDead: false
    };
  },
  PLAYER_VELOCITY: 5,
  MAX_STRESS: 100,
  STRESS_RATE: 100
};
