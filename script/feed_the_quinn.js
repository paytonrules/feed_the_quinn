FeedTheQuinn = function(assets) {
  var stateMachine = FeedTheQuinn.StateMachine(assets);

  function update(imageList) {
    stateMachine.update(imageList);
  };
  
  this.update = update;
};

