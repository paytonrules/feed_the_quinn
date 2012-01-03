describe("FeedTheQuinn", function() {
  var Game = require('../../script/feed_the_quinn/feed_the_quinn'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      should = require('should'),
      machine = { 
        update: function() {
          this.updated = true;
        },
        draw: function(screen) {
          this.screen = screen;
        },
        click: function(location) {
          this.location = location;
        },
        reset: function() {
          this.updated = false;
          this.screen = null;
        }
      },
      sinon = require('sinon');

  beforeEach(function() {
    machine.reset();
    Game.screen = 'screen';
  });

  it("initializes the state machine on the first update", function() {
    var stateMachineSpy = sinon.stub(StateMachine, 'init', function() {
      return machine;
    });

    Game.update();

    stateMachineSpy.called.should.be.true;
    stateMachineSpy.restore();
  });

  it("delegates subsequent updates to initialized the state machine", function() {
    Game.update();

    machine.updated.should.be.true;
  });

  it("sends draw to the state machine with the screen", function() {
    Game.draw('screen');

    machine.screen.should.eql('screen');
  });

  it("sends clicks to the state machine", function() {
    Game.click({x: 0});

    machine.location.should.eql({x: 0});
  });

});
