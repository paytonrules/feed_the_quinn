FeedTheQuinn = function(assets, screen) {
  var stateMachine = FeedTheQuinn.StateMachine(assets, screen);

  function update() {
    stateMachine.update();
  };
  
  this.update = update;
};

