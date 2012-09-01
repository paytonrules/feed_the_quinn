var Eskimo = require('eskimo');
var game = require('./feed_the_quinn/feed_the_quinn');
var Assets = require('./feed_the_quinn/assets');

Eskimo({game: game,
         jquery: $}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Assets // Overloaded term
                           });
