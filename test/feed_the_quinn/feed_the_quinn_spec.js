describe("FeedTheQuinn", function() {
  var Game = require('../../script/feed_the_quinn/feed_the_quinn'),
      StateMachine = require('../../script/feed_the_quinn/state_machine'),
      assert = require('assert'),
      TestGameSpecFactory = require('eskimo').TestGameSpecFactory,
      daddyLoader = require('../../script/feed_the_quinn/loaders/daddy'),
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
    var spec = TestGameSpecFactory.create({}, 'screen');
    
    var game = Game.create(spec, 'screen');

    var transitionTable = require("../../script/feed_the_quinn/transition_table.js");
    assert.ok(StateMachine.init.calledWith(transitionTable, {spec: spec, screen: 'screen'} ));
  });

  it("wires up a custom daddy loader", function() {
    var spec = TestGameSpecFactory.create({}, 'screen');
    var game = Game.create(spec, 'screen');

    assert.ok(spec.registeredLoader('daddy'));
  });

  it("delegates updates to initialized the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine),
        spec = TestGameSpecFactory.create({});
    
    var game = Game.create(spec, 'screen');
    
    game.update();

    assert(machine.updated);
  });

  it("sends clicks to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine),
        spec = TestGameSpecFactory.create({});
    var game = Game.create(spec,'screen');
    
    game.click({x: 0});

    assert.deepEqual(machine.location, {x: 0});
  });

  it("delegates keydown to the state machine", function() {
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine),
        spec = TestGameSpecFactory.create({});

    var game = Game.create(spec, 'screen');
    
    game.keydown({which: 3});
  
    assert.deepEqual(machine.event, {which: 3});  
  });

  it("delegates keyup to the state machine", function() {
    var spec = TestGameSpecFactory.create({});
    var stateMachineSpy = sandbox.stub(StateMachine, 'init').returns(machine);
    
    var game = Game.create(spec, 'screen');
    
    game.keyup({which: 3});
    
    assert.deepEqual(machine.event, {which: 3});
  });
});
