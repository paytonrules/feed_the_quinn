describe("FeedTheQuinn", function() {
  var Game = require('../../script/feed_the_quinn/feed_the_quinn'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      should = require('should'),
      machine = { 
        update: function() {
          this.updated = true;
        },
        click: function(location) {
          this.location = location;
        },
        keydown: function(event) {
          this.event = event;
        },
        keyup: function(event) {
          this.event = event;
        },
        reset: function() {
          this.updated = false;
          this.screen = null;
        }
      },
      sandbox = require('sinon').sandbox.create();

  beforeEach(function() {
    machine.reset();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("initializes the state machine on creation", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    
    var game = Game.create('screen');

    stateMachineSpy.calledWith('screen').should.be.true;
  });

  it("delegates updates to initialized the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.update();

    machine.updated.should.be.true;
  });

  it("sends clicks to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.click({x: 0});

    machine.location.should.eql({x: 0});
  });

  it("delegates keydown to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.keydown({which: 3});
    
    machine.event.should.eql({which: 3});
  });

  it("delegates keyup to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.keyup({which: 3});
    
    machine.event.should.eql({which: 3});
  });
});
