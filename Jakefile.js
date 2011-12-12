function sh(command) {
  var sys = require('util')
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) { sys.puts(stdout); }
  exec(command, puts);
}

desc("Browserify the project (no minification")
task("browserify", function() {
  sh('browserify script/feed_the_quinn.js > script/feed_the_quinn_browserified.js');
}); 
