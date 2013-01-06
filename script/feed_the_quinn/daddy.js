var Daddy = module.exports = {
  create: function(gameObject) {
    var stressTicks = 0;
    gameObject.stress = gameObject.stress || 0;
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
        gameObject.stress++;
      }
     
      if (gameObject.stress >= deathLevel) {
        this.isDead = true;
      }
    }

    function reset() {
      stressTicks = 0;
      gameObject.stress = 0;
    }

    return {
      update: update,
      stress: function() {
        return gameObject.stress;
      },
      location: gameObject.location || {x: 0, y: 0},
      isDead: false,
      reset: reset
    };
  },
};
