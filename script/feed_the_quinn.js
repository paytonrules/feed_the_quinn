var Eskimo = require('eskimo');
var FeedTheQuinn = {};
require('./feed_the_quinn/updater');
var Assets = require('./feed_the_quinn/assets');

Eskimo({updater: FeedTheQuinn.Updater,
         jquery: $}).start({canvas: $('#feed_the_quinn'),
                            document: document,
                            levels: Assets   
                           });

