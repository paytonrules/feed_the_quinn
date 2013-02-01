describe("FeedTheQuinn#GameScreen", function() {
  var sandbox = require('sinon').sandbox.create(),
      eskimo = require('eskimo'),
      Assert = require('assert'),
      GameScreen = require('../../script/feed_the_quinn/game_screen'),
      ProgressBar = require("../../script/feed_the_quinn/progress_bar.js"),
      TestGameSpecFactory = require('eskimo').TestGameSpecFactory,
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
          }
        }
      };

      mockSm = {
        daddyDies: function() {
          mockSm.isDead = true;
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

      it("updates the daddy with the keystate when something is pressed", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.keydown({}, {which: 37});
        game.update(mockSm);

        Assert.equal(1, gameSpec.level().gameObject('daddy').location.x);
      });

      it("doesn't change the key state until a keyup is sent", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.keydown({}, {which: 37});
        game.update(mockSm);
        game.update(mockSm);

        Assert.equal(0, gameSpec.level().gameObject('daddy').location.x);
      });

      it("Stops moving direction on a keyup", function() {
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.keydown({}, {which: 37});
        game.update(mockSm);
        game.keyup({}, {which: 37});
        game.update(mockSm);

        Assert.equal(1, gameSpec.level().gameObject('daddy').location.x);
      });
      
      it("Resets daddy's stress when Baby is fed (spacebar is placed during collision)", function() {
        assets.levelOne.daddy.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.daddy.testAsset = {width: 10, height: 10};
        assets.levelOne.daddy.daddy.stress = 50;
        assets.levelOne.daddy.daddy.stressRate = 100;
        assets.levelOne.baby.sprite.location = {x: 12, y: 12};
        assets.levelOne.baby.sprite.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.keydown({}, {which: 32}); // Spacebar
        game.update(mockSm);

        Assert.equal(gameSpec.level().gameObject('daddy').stress(), 0);
      });

      it("doesnt reset the daddy's stress if the spacebar isn't pressed", function() {
        assets.levelOne.daddy.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.daddy.stress = 50;
        assets.levelOne.daddy.daddy.stressRate = 100;
        assets.levelOne.baby.sprite.location = {x: 10, y: 10};
        assets.levelOne.baby.sprite.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.update(mockSm);

        Assert.equal(gameSpec.level().gameObject('daddy').stress(), 50);
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

        Assert.equal(gameSpec.level().gameObject('daddy').stress(), 50);
      });
    });

    describe("progress bar", function() { 
      // Can you demockify this?
      // Yes - if you use register loader
      it("is put on the screen", function() {
        var progressBarCreation = sandbox.spy(ProgressBar, 'create');

        var game = new GameScreen({spec: gameSpec, screen: screen});
        
        Assert.strictEqual(screen.findObjectNamed('progressBar'),
                           progressBarCreation.returnValues[0]);
      });
      
      it("updates the progress bar with the state of daddy's stress", function() {
        assets.levelOne.progressBar.bar.stress = 0;
        assets.levelOne.daddy.daddy.stress = 39;
        assets.levelOne.daddy.daddy.location = {x: 0, y: 0}; 

        gameSpec = createGameSpecWithDaddyObject(assets);
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.update(mockSm);

        Assert.equal(gameSpec.level().gameObject('progressBar').stress, 40);
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

        Assert.ok(mockSm.isDead);
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
        
        Assert.ok(!mockSm.isDead);
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

          Assert.ok(!foodObject);

          game.update(mockSm);

          foodObject = screen.findObjectNamed("food");
          Assert.ok(foodObject);
        });

        it("draws the piece of food with the food asset", function() {
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          var mockContext = new MockContext();

          placeAPieceOfFood(game);

          var foodObject = screen.findObjectNamed("food");
          foodObject.draw(mockContext);
          Assert.equal('images/food.png', mockContext.asset.src);
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

          Assert.equal(foodObject.location.x, 50);
          Assert.equal(foodObject.location.y, 200);
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
          Assert.equal(foodObject.location.x, 90);
          Assert.equal(foodObject.location.y, 90);
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
 
          Assert.equal(foodObjects[0].location.x, 1);
          Assert.equal(foodObjects[0].location.y, 2);
          Assert.equal(foodObjects[1].location.x, 3);
          Assert.equal(foodObjects[1].location.y, 4); 
        });

        // YOU WROTE THIS TWICE KILL THE DUP!
        it("lets you pick up food by walking over it", function() {
          assets.levelOne.food.sprite_sheet.map[0].width = 10;
          assets.levelOne.food.sprite_sheet.map[0].height = 10;
          // For some reason this is not returning a daddy
          gameSpec = createGameSpecWithDaddyObject(assets);

          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          sandbox.stub(Math, "random").returns(1);

          placeAPieceOfFood(game);
          var daddy = gameSpec.level().gameObject("daddy");
          daddy.location = {x: 2, y: 2};
          game.update(mockSm);

          // Check that the player has food
          Assert.ok(daddy.hasFood());
        });

        // can you actually feed ...the ....QUINN!!
      });
    });
  });
});
