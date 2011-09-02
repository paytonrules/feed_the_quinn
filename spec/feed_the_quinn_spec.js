describe("FeedTheQuinn", function() {
  var FeedTheQuinn, quinn;

  beforeEach(function() {
    FeedTheQuinn = require("spec_helper").FeedTheQuinn;
  });

  it("initializes the state machine with the assets and the screen", function() {
    spyOn(FeedTheQuinn, "StateMachine");

    quinn = new FeedTheQuinn('assets', 'screen');

    expect(FeedTheQuinn.StateMachine).toHaveBeenCalledWith('assets', 'screen');
  });

  it("delegates subsequent updates to the state machine", function() {
    sm = {update: function(){} };
    spyOn(FeedTheQuinn, "StateMachine").andReturn(sm);
    spyOn(sm, "update");

    quinn = new FeedTheQuinn('assets', 'screen');

    quinn.update();

    expect(sm.update).toHaveBeenCalled();
  });

});

