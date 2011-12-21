var Eskimo = require('eskimo');
var Updater = require('./feed_the_quinn/feed_the_quinn');
var Assets = require('./feed_the_quinn/assets');

Eskimo({game: Updater,
         jquery: $}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Assets   
                           });

