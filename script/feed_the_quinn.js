var Eskimo = require('eskimo');
var Updater = require('./feed_the_quinn/updater');
var Assets = require('./feed_the_quinn/assets');
var global = global || window;
global.StartButton = require('./feed_the_quinn/start_button');

Eskimo({updater: Updater,
         jquery: $}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Assets   
                           });

