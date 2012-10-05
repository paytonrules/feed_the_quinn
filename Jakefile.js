desc("Bundle the project (no minification");
task("bundle", function() {
  jake.exec('onejs build package.json script/feed_the_quinn_bundle.js', function() {
    console.log("browser version built");
    complete();
  }, {printStderr: true});
}); 

desc("Install node module dependencies");
task("dependencies", function() {
  npm_install('onejs -g', 'canvas', 'jsdom', 'jquery', 'mocha -g', 'should', 'sinon', 'underscore');
  jake.exec("npm link eskimo", function() {}, {printStderr: true});
});
