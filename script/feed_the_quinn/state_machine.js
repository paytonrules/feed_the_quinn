FeedTheQuinn.StateMachine = function(screen) {
  var currentState = FeedTheQuinn.TitleScreen;
  currentState.load(screen);

  return {
    currentState: currentState, 
    update: function() {
      this.currentState.update();
    }
  };
};
