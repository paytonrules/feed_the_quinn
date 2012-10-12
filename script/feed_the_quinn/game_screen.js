var Keyboard = require('eskimo').Keyboard,
    keystate = {},
    Daddy = require('./daddy.js'),
    daddy,
    ProgressBar = require('./progress_bar.js'),
    progressBar,
    FedQuinnChecker = require('./quinn_status.js'),
    fedQuinnChecker; 

module.exports = {
  instantiator: function(level, screen) {
    daddy = Daddy.create(level.gameObject('daddy'));

    // I think I want this in the framework - a generic progress bar 
    progressBar = ProgressBar.create('progressBar', level.gameObject('progressBar'));
    screen.put(progressBar);

    fedQuinnChecker = FedQuinnChecker.create({daddy: daddy, 
                                             quinn: {location: {x: 0}, boundingBox: {x: 0}},
                                             keystate: {}});
  },

  load: function(gameSpec, screen) {
    var self = this;
    gameSpec.load('levelOne', function(level) {
      self.instantiator(level, screen);
    });
  },
  
  update: function() {
    if (fedQuinnChecker.check()) {
      daddy.reset();
    }
    daddy.update(keystate);
    progressBar.update(daddy.stress);
  },

  // Probably not at the right level of abstraction
  // Could definitely be a framework object
  keydown: function(event) {
    keystate[Keyboard[event.which]] = true;
  },

  keyup: function(event) {
    keystate[Keyboard[event.which]] = false;
  },

  // Only for testing
  setDaddy: function(newDaddy) {
    daddy = newDaddy;
  },

  daddyStress: function() {
    return daddy.stress;
  }

};
