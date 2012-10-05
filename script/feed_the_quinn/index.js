var Eskimo = require('eskimo');
var game = require('./feed_the_quinn.js');
var Levels = require('./assets.js');

Eskimo({game: game}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Levels
                           });
