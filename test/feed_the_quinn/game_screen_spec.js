describe("FeedTheQuinn#GameScreen", function() {
  var sinon = require('sinon'),
      sandbox = sinon.sandbox.create(),
      eskimo = require('eskimo'),
      assert = require('assert'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      ProgressBar = require('../../script/feed_the_quinn/progress_bar.js'),
      Text = require('../../script/feed_the_quinn/text'),
      TestGameSpecFactory = require('eskimo').TestGameSpecFactory,
      StartButton = require('../../script/feed_the_quinn/start_button'),
      assets,      
      gameSpec,
      screen,
      mockSm;

  describe("Game Screen / Level One", function() {
    function createGameSpecWithDaddyObject(assests) {
      var daddyLoader = require("../../script/feed_the_quinn/loaders/daddy");
      var spec = TestGameSpecFactory.create(assets);
      var AssetLoader = require('eskimo').TestAssetLoader;
      spec.registerLoader('daddy', daddyLoader.create(AssetLoader));
      return spec;
    }

    beforeEach(function() {
      assets = { 
        "levelOne" : {
          "daddy" : {
            "daddy" : {
              'location' : {x: 0, y: 0},
              'stressRate' : 0,
              'asset' : {
                'width' : 0,
                'height' : 0
              }
            }
          },
          "score" : {
            'text' : {
              'location' : {x: 1, y: 1},
              'score' : 0
            }
          },
          "endGameScore" : {
            'text' : {
              'font' : 'end game font'
            }
          },
          "progressBar" : {"bar" : {}},
          "baby" : {
            'sprite' : {
              'asset' : {
                'width' : 50,
                'height' : 50
              },
              'location' : { 
                x: 100, y: 100
              }
            }
          },
          "food" : {
            "sprite_sheet" : {
              'location' : {},
              'src' : 'images/food.png',
              'map' : [ {
                'width' : 0,
                'height' : 0
              } ]
            }
          },
          'newGameButton' : {
            'sprite' : {
              'name' : 'newGameButton'
            }
          }
        }
      };

      mockSm = {
        daddyDies: function() {
          mockSm.isDead = true;
        },
        restart: function() {
          mockSm.restarted = true;
        }
      };

      var Screen = require('eskimo').Screen;
      var Canvas = require('canvas');
      var canvas = new Canvas(200, 200);
      var $ = require('jquery');

      screen = new Screen($(canvas));
      screen.height = function() {return 1;};
      screen.width = function() {return 1;};
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe("moving daddy", function() {

      beforeEach(function() {
        assets.levelOne.daddy.daddy.velocity = 1;
        assets.levelOne.daddy.daddy.location = {x: 2, y: 2};
        gameSpec = createGameSpecWithDaddyObject(assets);
      });

      it("creates the text object for the score", function() {
        sandbox.stub(Text, 'create').returns({});
        
        var game = new GameScreen({spec: gameSpec, screen: screen});

        assert.ok(Text.create.calledWithMatch({'score' : 0}, 'score'));
      });

      it("puts the text object on the screen", function() {
        sandbox.stub(Text, 'create').returns({name: "text"});
        
        var game = new GameScreen({spec: gameSpec, screen: screen});

        assert.ok(screen.findObjectNamed("text"));
      });

      it("puts the daddy on the screen", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        assert.equal(gameSpec.level().gameObject('daddy'), screen.findObjectNamed("daddy"));
      });

      it("updates the daddy with the keystate when something is pressed", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.keydown({}, {which: 37});
        game.update(mockSm);

        assert.equal(1, gameSpec.level().gameObject('daddy').location.x);
      });

      it("doesn't change the key state until a keyup is sent", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.keydown({}, {which: 37});
        game.update(mockSm);
        game.update(mockSm);

        assert.equal(0, gameSpec.level().gameObject('daddy').location.x);
      });

      it("Stops moving direction on a keyup", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.keydown({}, {which: 37});
        game.update(mockSm);
        game.keyup({}, {which: 37});
        game.update(mockSm);

        assert.equal(1, gameSpec.level().gameObject('daddy').location.x);
      });
      
      it("Sets the score up 10 when quinn is fed", function() {
        assets.levelOne.daddy.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.daddy.testAsset = {width: 10, height: 10};
        assets.levelOne.daddy.daddy.stress = 50;
        assets.levelOne.daddy.daddy.stressRate = 100;
        assets.levelOne.baby.sprite.location = {x: 12, y: 12};
        assets.levelOne.baby.sprite.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        var daddy = gameSpec.level().gameObject("daddy");
        daddy.pickUpFood();
        
        game.update(mockSm);

        assert.equal(gameSpec.level().gameObject('score').score, 10);
      });

      it("removes the food when the daddy gives it to quinn", function() {
        assets.levelOne.daddy.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.daddy.testAsset = {width: 10, height: 10};
        assets.levelOne.daddy.daddy.stress = 50;
        assets.levelOne.daddy.daddy.stressRate = 100;
        assets.levelOne.baby.sprite.location = {x: 12, y: 12};
        assets.levelOne.baby.sprite.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        var daddy = gameSpec.level().gameObject("daddy");
        daddy.pickUpFood();
        
        game.update(mockSm);

        assert.ifError(daddy.hasFood());
      });

      it("doesnt reset the daddy's stress if the spacebar isn't pressed", function() {
        assets.levelOne.daddy.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.daddy.stress = 50;
        assets.levelOne.daddy.daddy.stressRate = 100;
        assets.levelOne.baby.sprite.location = {x: 10, y: 10};
        assets.levelOne.baby.sprite.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.update(mockSm);

        assert.equal(gameSpec.level().gameObject('daddy').stress(), 50);
      });

      it("doesnt reset the daddy's stress if the daddy isnt intersecting the baby", function() {
        assets.levelOne.daddy.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.daddy.testAsset = {width: 1, height: 1};
        assets.levelOne.daddy.daddy.stress = 50;
        assets.levelOne.daddy.daddy.stressRate = 100;
        assets.levelOne.baby.sprite.location = {x: 12, y: 12};
        assets.levelOne.baby.sprite.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.keydown({}, {which: 32}); // Spacebar
        game.update(mockSm);

        assert.equal(gameSpec.level().gameObject('daddy').stress(), 50);
      });
    });

    describe("progress bar", function() { 
      // Can you demockify this?
      // Yes - if you use register loader
      it("is put on the screen", function() {
        var progressBarCreation = sandbox.spy(ProgressBar, 'create');

        var game = new GameScreen({spec: gameSpec, screen: screen});
        
        assert.strictEqual(screen.findObjectNamed('progressBar'),
                           progressBarCreation.returnValues[0]);
      });
      
      it("updates the progress bar with the state of daddy's stress", function() {
        assets.levelOne.progressBar.bar.stress = 0;
        assets.levelOne.daddy.daddy.stress = 39;
        assets.levelOne.daddy.daddy.location = {x: 0, y: 0}; 

        gameSpec = createGameSpecWithDaddyObject(assets);
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.update(mockSm);

        assert.equal(gameSpec.level().gameObject('progressBar').stress, 40);
      });

      it("sends a death notice to the state machine when daddy dies", function() {
        assets.levelOne.daddy.daddy.maxStress = 100;
        assets.levelOne.daddy.daddy.stressRate = 1;
        assets.levelOne.daddy.daddy.location = {x: 0, y: 0};
        assets.levelOne.daddy.daddy.stress = 99;

        gameSpec = createGameSpecWithDaddyObject(assets);
        var game = new GameScreen({spec: gameSpec,
                                   screen: screen});

        game.update(mockSm);

        assert.ok(mockSm.isDead);
      });

      it("does not send a death notice when daddy is alive", function() {
        assets.levelOne.daddy.daddy = {
          maxStress: 100,
          stressRate: 1,
          location: {x: 0, y: 0},
          stress: 1 
        };

        gameSpec = createGameSpecWithDaddyObject(assets);
        var game = new GameScreen({spec: gameSpec,
                                  screen: screen});

        game.update(mockSm);
        
        assert.ok(!mockSm.isDead);
      });

      it("stops updating when the game is over", function() {
        assets.levelOne.progressBar.bar.stress = 0;
        assets.levelOne.daddy.daddy.stress = 39;
        gameSpec = createGameSpecWithDaddyObject(assets);
        
        var game = new GameScreen({spec: gameSpec,
                                  screen: screen});

        game.endGame(mockSm);
        game.update(mockSm);

        assert.equal(0, gameSpec.level().gameObject("progressBar").stress);
      });

      it("changes the font to the end game font after the game is ended", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.endGame();
  
        assert.equal('end game font', gameSpec.level().gameObject('score').font);
      });

      it('puts the end game score in the middle of the screen', function() {
        sandbox.stub(screen, 'width').returns(100);
        sandbox.stub(screen, 'height').returns(110);
        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.endGame();

        var score = gameSpec.level().gameObject('score');
        assert.equal('center', score.textAlign);
        assert.equal('middle', score.textBaseline);
        assert.equal(50, score.location.x);
        assert.equal(55, score.location.y);
      });

      it('puts the newGameButton on the screen when daddy dies', function() {
        assert.ifError(screen.findObjectNamed('newGameButton'));

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.endGame();
      
        assert.ok(screen.findObjectNamed('newGameButton'));
      });

      it('creates a new game button from the newGameButton sprite when daddy dies and sends clicks to it', function() {
        var button = StartButton.create({}),
            buttonMock = sandbox.mock(button);

        sandbox.stub(StartButton, 'create').withArgs(sinon.match({name: 'newGameButton'})).returns(button);

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.endGame();
        
        var location = {x: 0, y: 2};
        buttonMock.expects('click').withArgs(location);

        game.click('statemachine', location);

        buttonMock.verify();
      });

      it('restarts after the button is clicked', function() {
        var button = {click: sandbox.stub().yields()};
        sandbox.stub(StartButton, 'create').returns(button);

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.endGame(mockSm);

        game.click(mockSm, {});

        assert.ok(mockSm.restarted);
      });

      it('doesnt do anything on update until load is complete', function(done) {
        var game;
        sandbox.stub(gameSpec, 'load', function() {
          done();
        });
        
        game = new GameScreen({spec: gameSpec, screen: screen});
        
        assert.doesNotThrow(function() {
          game.update(mockSm);
        });
      });

      describe("food generation", function() {
        function MockContext() {
          var that = this;
          this.drawImage = function(asset, x, y) {
            that.asset = asset;
            that.x = x;
            that.y = y;
          };
          return this;
        }

        function placeAPieceOfFood(game) {
          for(var i=0; i < 100; i++) {
            game.update(mockSm);
          }
        }

        it("puts a piece of food on the screen every 100 updates", function() {
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          for(var i=0; i < 99; i++) {
            game.update(mockSm);
          }
          var foodObject = screen.findObjectNamed("food");

          assert.ok(!foodObject);

          game.update(mockSm);

          foodObject = screen.findObjectNamed("food");
          assert.ok(foodObject);
        });

        it("draws the piece of food with the food asset", function() {
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          var mockContext = new MockContext();

          placeAPieceOfFood(game);

          var foodObject = screen.findObjectNamed("food");
          foodObject.draw(mockContext);
          assert.equal('images/food.png', mockContext.asset.src);
        });

        it("puts the pieces of food in random locations on the screen, multipled by screen width/height", function() {
          screen.width = function() {return 100;};
          screen.height = function() {return 200;};

          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          var randoms = [0.5, 1];
          sandbox.stub(Math, "random", function() {
            return randoms.shift();
          });
          placeAPieceOfFood(game);
          
          var foodObject = screen.findObjectNamed("food");

          assert.equal(foodObject.location.x, 50);
          assert.equal(foodObject.location.y, 200);
        });

        it("removes the size of the asset", function() {
          screen.width = function() {return 100;};
          screen.height = function() {return 100;};
          assets.levelOne.food.sprite_sheet.map = [ {
            width: 10,
            height: 10
          } ];

          gameSpec = createGameSpecWithDaddyObject(assets);
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          var randoms = [1, 1];
          sandbox.stub(Math, "random", function() {
            return randoms.shift();
          });
          placeAPieceOfFood(game);
 
          var foodObject = screen.findObjectNamed("food");
          assert.equal(foodObject.location.x, 90);
          assert.equal(foodObject.location.y, 90);
        });
 
        it("generates successive pieces of food, with new random locations", function() {
          gameSpec = createGameSpecWithDaddyObject(assets);
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});
 
          var randoms = [1, 2, 3, 4];
          sandbox.stub(Math, "random", function() {
            return randoms.shift();
          });
 
          placeAPieceOfFood(game);
          placeAPieceOfFood(game);
 
          var foodObjects = screen.findObjectsNamed("food");
 
          assert.equal(foodObjects[0].location.x, 1);
          assert.equal(foodObjects[0].location.y, 2);
          assert.equal(foodObjects[1].location.x, 3);
          assert.equal(foodObjects[1].location.y, 4); 
        });

        describe("picking up food", function() {
          var game;
          
          beforeEach(function() {
            sandbox.stub(screen, "width").returns(100);
            sandbox.stub(screen, "height").returns(100);
            
            assets.levelOne.food.sprite_sheet.map[0].width = 10;
            assets.levelOne.food.sprite_sheet.map[0].height = 10;
            assets.levelOne.daddy.daddy.asset.width = 10;
            assets.levelOne.daddy.daddy.asset.height = 10;
            
            gameSpec = createGameSpecWithDaddyObject(assets);

            game = new GameScreen({spec: gameSpec,
                                   screen: screen});
          });
         
          it("lets you pick up food by walking over it", function() {
            sandbox.stub(Math, "random").returns(1);
            placeAPieceOfFood(game);

            var daddy = gameSpec.level().gameObject("daddy");
            assert.ifError(daddy.hasFood());
            
            daddy.setLocation({x: 91, y: 91});
            game.update(mockSm);

            assert.ok(daddy.hasFood());
          });

          it("removes the food from the screen when it is picked up", function() {
            sandbox.stub(Math, "random").returns(1);
            placeAPieceOfFood(game);

            var daddy = gameSpec.level().gameObject("daddy");
            daddy.setLocation({x: 91, y: 91});
            game.update(mockSm);

            assert.ifError(screen.findObjectNamed("food"));
          });

          it("removes the RIGHT food from the screen", function() {
            var locations = [1, 1, 0.5, 0.5];
            sandbox.stub(Math, "random", function() {
              return locations.shift();
            });
            placeAPieceOfFood(game);
            placeAPieceOfFood(game);

            var daddy = gameSpec.level().gameObject("daddy");
            daddy.setLocation({x: 45, y: 45});
            game.update(mockSm);

            var food = screen.findObjectsNamed("food");
            assert.equal(1, food.length);
            assert.equal(food[0].location.x, 90);
            assert.equal(food[0].location.y, 90);
          });

          it("only lets you pick up one piece of food", function() {
            sandbox.stub(Math, "random").returns(1);
            placeAPieceOfFood(game);
            placeAPieceOfFood(game);

            var daddy = gameSpec.level().gameObject("daddy");
            daddy.setLocation({x: 90, y: 90});
            game.update(mockSm);
            game.update(mockSm); // Two updates - but shouldn't get it again

            var food = screen.findObjectsNamed("food");
            assert.equal(1, food.length);
          });
        });
      });
    }); 
  });
});
