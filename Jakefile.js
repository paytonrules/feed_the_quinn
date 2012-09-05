function npm_install() {
  for(var i = 0; i < arguments.length; i++) {
    jake.exec("npm install " + arguments[i], function() {}, {printStderr: true});
  }
}

desc("Browserify the project (no minification");
task("browserify", function() {
  jake.exec('browserify script/feed_the_quinn.js > script/feed_the_quinn_browserified.js', function() {
    console.log("browser version built");
    complete();
  }, {printStderr: true});
}); 

desc("Run specs");
task("spec", function() {
  jake.exec('. run_specs', function() {}, {printStdout: true, printStderr: true});
});


desc("Install node module dependencies");
task("dependencies", function() {
  npm_install('browserify -g', 'canvas', 'jsdom', 'jquery', 'mocha -g', 'should', 'sinon', 'underscore');
  jake.exec("npm link eskimo", function() {}, {printStderr: true});
});
