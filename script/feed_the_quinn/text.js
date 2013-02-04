module.exports = {
  create: function(gameObject, binding) {

    return {
      draw: function(context) {
        context.font = gameObject.font;
        context.fillStyle = gameObject.fillStyle;
        context.fillText(gameObject[binding], 
                         gameObject.location.x, 
                         gameObject.location.y);
      }
    };
  }
};
