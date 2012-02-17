var Daddy = module.exports = {
  create: function(gameObject) {
    var currentVelocity = 0;
    
    function moveHoriz(direction) {
      if (currentVelocity < Daddy.PLAYER_VELOCITY) {
        currentVelocity += direction * Daddy.PLAYER_VELOCITY;
      }
    };

    function update() {
      gameObject.location.x += currentVelocity;
    };


    return {
      update: update,
      moveHoriz: moveHoriz
    };
  },
  PLAYER_VELOCITY: 5
};
