module.exports = {

  create: function(name, obj) {
    
    function draw(context) {
      var image = obj.asset;
      var stress = obj.stress || 0;
      var width = (image.width * (stress / 100));
     
      context.drawImage(image, 
                        0, 
                        0, 
                        width, 
                        image.height, 
                        obj.location.x, 
                        obj.location.y, 
                        width, 
                        image.height);
    }

    return {
      name: name,
      draw: draw,
      update: function(stress) {
        obj.stress = stress;
      }
    };
  }
};
