FeedTheQuinn = function(assets) {
  var stateMachine;

  function update(imageList) {
    stateMachine.update(imageList);
  };

  stateMachine = FeedTheQuinn.StateMachine(assets);
  this.update = update;
};

