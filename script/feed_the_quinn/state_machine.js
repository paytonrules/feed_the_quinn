FeedTheQuinn.StateMachine = function(assets, screen) {
  currentState = FeedTheQuinn.TitleScreen;
  currentState.load(assets, screen);

  return {
    currentState: currentState, 
    update: function() {
      this.currentState.update();
    }
  };
};
