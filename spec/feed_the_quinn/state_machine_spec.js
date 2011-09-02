describe("StateMachine", function() {
  var sm, assets, StateMachine;

  beforeEach(function() {
    StateMachine = require("../spec_helper").FeedTheQuinn.StateMachine;
    assets = 'assets';
  });

  it("returns a state machine object", function() {
    spyOn(FeedTheQuinn.TitleScreen, "load");

    sm = StateMachine(assets, 'screen');

    expect(sm).not.toBeUndefined();
  });

  it("begins by loading the title screen", function() {
    spyOn(FeedTheQuinn.TitleScreen, "load");

    sm = StateMachine(assets, 'screen');

    expect(FeedTheQuinn.TitleScreen.load).toHaveBeenCalledWith(assets, 'screen');
  });

  it("delegates the update method to the current states update", function() {
    spyOn(FeedTheQuinn.TitleScreen, "load");
    spyOn(FeedTheQuinn.TitleScreen, "update");

    sm = StateMachine(assets, 'screen');

    sm.update();

    expect(FeedTheQuinn.TitleScreen.update).toHaveBeenCalled();
  });

});
