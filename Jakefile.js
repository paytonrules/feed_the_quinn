function sh(command) {
  var sys = require('util')
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) { sys.puts(stdout); }
  exec(command, puts);
}

function npm_install() {
  for(var i=0; i < arguments.length; i++) {
    sh("npm install " + arguments[0]);
  }
}

desc("Browserify the project (no minification")
task("browserify", function() {
  sh('browserify script/feed_the_quinn.js > script/feed_the_quinn_browserified.js');
}); 

desc("Install node module dependencies")
task("dependencies", function() {
  npm_install('should', 'mocha -g', 'underscore');
});
