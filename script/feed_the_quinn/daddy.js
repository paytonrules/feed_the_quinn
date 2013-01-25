var Daddy = module.exports = {
  create: function(sprite) {
    var stressTicks = 0;
    sprite.stress = sprite.stress || 0;
    var stressRate = sprite.stressRate || 1; // Default to 1 to avoid divide by 0
    var deathLevel = sprite.maxStress || 0;
    var velocity = sprite.velocity || 0;

    function move(keystate) {
      if (keystate.left) {
        sprite.location.x -= velocity;
      }

      if (keystate.right) {
        sprite.location.x += velocity; 
      }

      if (keystate.up) {
        sprite.location.y -= velocity;
      }

      if (keystate.down) {
        sprite.location.y += velocity;
      }
    }

    function update(keystate) {
      move(keystate);
      stressTicks++;

      if (stressTicks % stressRate === 0) {
        sprite.stress++;
      }
     
      if (sprite.stress >= deathLevel) {
        this.isDead = true;
      }
    }

    function reset() {
      stressTicks = 0;
      sprite.stress = 0;
    }

    return {
      update: update,
      stress: function() {
        return sprite.stress;
      },
      location: sprite.location || {x: 0, y: 0},
      isDead: false,
      reset: reset,
      left: function() {
        return sprite.left();
      },
      right: function() {
        return sprite.right();
      },
      top: function() {
        return sprite.top();
      },
      bottom: function() {
        return sprite.bottom();
      }
    };
  }
};
