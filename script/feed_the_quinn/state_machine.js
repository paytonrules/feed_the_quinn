FeedTheQuinn.StateMachine = function(assets) {
  currentState = FeedTheQuinn.TitleScreen;
  currentState.load(assets);
  return {
    update: function(imageList) {
      currentState.update(imageList);
    }
  };
};
