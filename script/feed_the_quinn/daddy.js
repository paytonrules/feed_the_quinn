var Daddy = function(sprite) {
  var stressTicks = 0, 
      stressRate = sprite.stressRate || 1, // Default to 1 to avoid divide by 0
      deathLevel = sprite.maxStress || 0,
      velocity = sprite.velocity || 0,
      carryingFood = false;

  sprite.stress = sprite.stress || 0;

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

  this.update = function(keystate) {
    move(keystate);
    stressTicks++;

    if (stressTicks % stressRate === 0) {
      sprite.stress++;
    }

    if (sprite.stress >= deathLevel) {
      this.isDead = true;
    }
  };

  this.reset = function() {
    stressTicks = 0;
    sprite.stress = 0;
  };

  this.stress = function() {
    return sprite.stress;
  };
  
  this.location = sprite.location || {x: 0, y: 0};
  this.isDead = false;
  this.name =  sprite.name;
  this.left = function() {
    return sprite.left();
  };
  this.right = function() {
    return sprite.right();
  };
  this.top = function() {
    return sprite.top();
  };
  this.bottom = function() {
    return sprite.bottom();
  };
  this.draw = function() {
    sprite.draw.apply(sprite, arguments);
  };
  this.pickUpFood = function() {
    carryingFood = true;
  };
  this.hasFood = function() {
    return carryingFood;
  };
  this.setLocation = function(point) {
    sprite.location = point;
  };
};

module.exports = {
  // Eventually want to change the format to say daddy: { sprite: } 
  // so that the custom fields like stress and stressRate are 
  // on daddy not on the sprite.  But not today.
  create: function(sprite) {
    return new Daddy(sprite);
  }
};
