describe("FeedTheQuinn", function() {
  var Game = require('../../script/feed_the_quinn/feed_the_quinn'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      assert = require('assert'),
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
    sandbox.stub(StateMachine, 'init').returns(machine);
    
    var game = Game.create('spec', 'screen');

    var transitionTable = require("../../script/feed_the_quinn/transition_table.js");
    assert(StateMachine.init.calledWith(transitionTable, {spec: 'spec', screen: 'screen'} ));
  });

  it("delegates updates to initialized the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.update();

    assert(machine.updated);
  });

  it("sends clicks to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.click({x: 0});

    assert.deepEqual(machine.location, {x: 0});
  });

  it("delegates keydown to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.keydown({which: 3});
  
    assert.deepEqual(machine.event, {which: 3});  
  });

  it("delegates keyup to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    var game = Game.create('screen');
    
    game.keyup({which: 3});
    
    assert.deepEqual(machine.event, {which: 3});
  });
});
