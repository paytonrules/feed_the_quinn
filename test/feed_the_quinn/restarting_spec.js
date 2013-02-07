describe("Restarting State", function() {
  var Restarting = require("../../script/feed_the_quinn/restarting"),
      assert = require('assert');

  it("needs to be creatable to satisfy the state machine", function() {
    var restart = new Restarting();
    assert.ok(restart);
  });
});
