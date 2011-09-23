describe("FeedTheQuinn", function() {
  var FeedTheQuinn, quinn, sm;

  beforeEach(function() {
    FeedTheQuinn = require("spec_helper").FeedTheQuinn;
    spyOn(FeedTheQuinn.TitleScreen, "load");
    
    sm = FeedTheQuinn.StateMachine('', '');
    spyOn(FeedTheQuinn, "StateMachine").andReturn(sm);
    
    quinn = new FeedTheQuinn('screen');
  });

  it("initializes the state machine with the assets and the screen", function() {
    expect(FeedTheQuinn.StateMachine).toHaveBeenCalledWith('screen');
  });

  it("delegates subsequent updates to the state machine", function() {
    spyOn(sm, "update");
    quinn.update();

    expect(sm.update).toHaveBeenCalled();
  });

});
