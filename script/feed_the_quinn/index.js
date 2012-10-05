var Eskimo = require('eskimo');
var game = require('./feed_the_quinn.js');
var Levels = require('./assets.js');
var $ = require('jquery');

Eskimo({game: game}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Levels
                           });
