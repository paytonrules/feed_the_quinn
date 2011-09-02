FeedTheQuinn.StateMachine = function(assets, screen) {
  currentState = FeedTheQuinn.TitleScreen;
  currentState.load(assets, screen);
  return {
    update: function() {
      currentState.update();
    }
  };
};
