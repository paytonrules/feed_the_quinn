describe("FeedTheQuinn", function() {
  var FeedTheQuinn, quinn;

  beforeEach(function() {
    FeedTheQuinn = require("spec_helper").FeedTheQuinn;
  });

  it("initializes the state machine with the assets", function() {
    spyOn(FeedTheQuinn, "StateMachine");

    quinn = new FeedTheQuinn('assets');

    expect(FeedTheQuinn.StateMachine).toHaveBeenCalledWith('assets');
  });

  it("delegates subsequent updates to the state machine", function() {
    sm = {update: function(){} };
    spyOn(FeedTheQuinn, "StateMachine").andReturn(sm);
    spyOn(sm, "update");

    quinn = new FeedTheQuinn('');

    quinn.update('image list');

    expect(sm.update).toHaveBeenCalledWith('image list');
  });

});

