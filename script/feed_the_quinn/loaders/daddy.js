var Daddy = require('../daddy'),
    Sprite = require('eskimo').Sprite;

module.exports = {
  create: function(AssetLoader) {

    return {
      load: function(levelSpec, objectName, level, callback) {
        var onSpriteComplete = function(object, asset) {
          callback(objectName, Daddy.create(Sprite(objectName, object)));
        };
        
        AssetLoader({
          object: levelSpec[objectName].daddy, 
          htmlTagName: 'img',
          loadEvent: 'load',
          onComplete: onSpriteComplete
        }).load();
      }
    };
  }
};
