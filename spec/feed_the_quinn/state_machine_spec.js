describe("StateMachine", function() {
  var sm, assets, StateMachine;

  beforeEach(function() {
    StateMachine = require("../spec_helper").FeedTheQuinn.StateMachine;
    assets = 'assets';
  });

  it("begins by loading the title screen", function() {
    spyOn(FeedTheQuinn.TitleScreen, "load");

    sm = StateMachine(assets);

    expect(FeedTheQuinn.TitleScreen.load).toHaveBeenCalledWith(assets);
  });

  it("returns a state machine object", function() {
    spyOn(FeedTheQuinn.TitleScreen, "load");

    sm = StateMachine(assets);

    expect(sm).not.toBeUndefined();
  });

  it("delegates the update method to the current states update", function() {
    spyOn(FeedTheQuinn.TitleScreen, "load");
    spyOn(FeedTheQuinn.TitleScreen, "update");

    sm = StateMachine(assets);

    sm.update('image list');

    expect(FeedTheQuinn.TitleScreen.update).toHaveBeenCalledWith('image list');
  });

});
