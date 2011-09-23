FeedTheQuinn.StateMachine = function(screen) {
  currentState = FeedTheQuinn.TitleScreen;
  currentState.load(screen);

  return {
    currentState: currentState, 
    update: function() {
      this.currentState.update();
    }
  };
};
