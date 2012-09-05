var Daddy = module.exports = {
  create: function(gameObject) {
    var stressTicks = 0;
    var stressRate = gameObject.stressRate || 1; // Default to 1 to avoid divide by 0
    var deathLevel = gameObject.maxStress || 0;
    var velocity = gameObject.velocity || 0;

    function move(keystate) {
      if (keystate.left) {
        gameObject.location.x -= velocity;
      }

      if (keystate.right) {
        gameObject.location.x += velocity; 
      }

      if (keystate.up) {
        gameObject.location.y -= velocity;
      }

      if (keystate.down) {
        gameObject.location.y += velocity;
      }
    }

    function update(keystate) {
      move(keystate);
      stressTicks++;

      if (stressTicks % stressRate == 0) {
        this.stress++;
      }
      
      if (this.stress >= deathLevel) {
        this.isDead = true;
      }
    }

    return {
      update: update,
      stress: 0,
      isDead: false
    };
  },
};
