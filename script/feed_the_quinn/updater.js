FeedTheQuinn.Updater = function(screen) {
  var stateMachine = FeedTheQuinn.StateMachine(screen);

  function update() {
    stateMachine.update();
  };
  this.update = update;
};

