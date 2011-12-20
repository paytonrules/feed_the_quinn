var Eskimo = require('eskimo');
var Updater = require('./feed_the_quinn/updater');
var Assets = require('./feed_the_quinn/assets');

Eskimo({game: Updater,
         jquery: $}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Assets   
                           });

