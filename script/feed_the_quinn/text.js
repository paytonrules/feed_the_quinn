module.exports = {
  create: function(gameObject, binding) {

    return {
      draw: function(context) {
        context.font = gameObject.font;
        context.fillStyle = gameObject.fillStyle;
        context.textAlign = gameObject.textAlign || 'start';
        context.fillText(gameObject[binding], 
                         gameObject.location.x, 
                         gameObject.location.y);
      }
    };
  }
};
