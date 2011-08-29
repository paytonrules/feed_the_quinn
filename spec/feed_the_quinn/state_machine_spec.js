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

});
