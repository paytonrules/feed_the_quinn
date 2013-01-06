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
    beforeEach(function() {
      assets = { 
        "levelOne" : {
          "object" : "levelOneObject",
          "daddy" : {location: {x: 0, y: 0},
                     stressRate: 0
          },
          "progressBar" : {},
          "baby" : {'asset' : {
                        'width' : 50,
                        'height' : 50
                      },
                      'location' : { 
                        x: 100, y: 100
                      },
          },
          "food" : {
            'image' : { 
              'src' : 'images/food.png'
            },
            'location' : {}
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
    });

    afterEach(function() {
      sandbox.restore();
    });

    describe("moving daddy", function() {

      beforeEach(function() {
        assets.levelOne.daddy.velocity = 1;
        assets.levelOne.daddy.location = {x: 2, y: 2};
        gameSpec = TestGameSpecFactory.create(assets);
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
      
      it("Resets daddy's stress when Baby is fed", function() {
        assets.levelOne.daddy.location = {x: 10, y: 10};
        assets.levelOne.daddy.stress = 50;
        assets.levelOne.daddy.stressRate = 100;
        assets.levelOne.baby.location = {x: 10, y: 10};
        assets.levelOne.baby.asset = {width:10, height: 10};

        var game = new GameScreen({spec: gameSpec, screen: screen});
        game.keydown({}, {which: 32}); // Spacebar
        game.update(mockSm);

        Assert.equal(gameSpec.level().gameObject('daddy').stress, 0);
      });
    });

    describe("progress bar", function() {

      // Can you demockify this?
      it("is put on the screen", function() {
        var progressBarCreation = sandbox.spy(ProgressBar, 'create');

        var game = new GameScreen({spec: gameSpec, screen: screen});
        
        Assert.strictEqual(screen.findObjectNamed('progressBar'),
                           progressBarCreation.returnValues[0]);
      });
      
      it("updates the progress bar with the state of daddy's stress", function() {
        assets.levelOne.progressBar.stress = 0;
        assets.levelOne.daddy.stress = 39;
        assets.levelOne.daddy.location = {x: 0, y: 0}; 

        gameSpec = TestGameSpecFactory.create(assets);
        var game = new GameScreen({spec: gameSpec, screen: screen});

        game.update(mockSm);

        Assert.equal(gameSpec.level().gameObject('progressBar').stress, 40);
      });

      it("sends a death notice to the state machine when daddy dies", function() {
        assets.levelOne.daddy.maxStress = 100;
        assets.levelOne.daddy.stressRate = 1;
        assets.levelOne.daddy.location = {x: 0, y: 0};
        assets.levelOne.daddy.stress = 99;

        gameSpec = TestGameSpecFactory.create(assets);
        var game = new GameScreen({spec: gameSpec,
                                   screen: screen});

        game.update(mockSm);

        Assert.ok(mockSm.isDead);
      });

      it("does not send a death notice when daddy is alive", function() {
        assets.levelOne.daddy ={
          maxStress: 100,
          stressRate: 1,
          location: {x: 0, y: 0},
          stress: 1 
        };

        gameSpec = TestGameSpecFactory.create(assets);
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

        it("multiplies the random numbers by height and width");

        it("puts the pieces of food in random locations", function() {
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});

          var mockContext = new MockContext();   

          var randoms = [1, 2];
          sandbox.stub(Math, "random", function() {
            return randoms.shift();
          });
          placeAPieceOfFood(game);
          
          var foodObject = screen.findObjectNamed("food");
          foodObject.draw(mockContext);

          Assert.equal(mockContext.x, 1);
          Assert.equal(mockContext.y, 2);
        });
 
        it("generates successive pieces of food, with new random locations", function() {
          var game = new GameScreen({spec: gameSpec,
                                    screen: screen});
          var mockContextOne = new MockContext();
          var mockContextTwo = new MockContext();
 
          var randoms = [1, 2, 3, 4];
          sandbox.stub(Math, "random", function() {
            return randoms.shift();
          });
 
          placeAPieceOfFood(game);
          placeAPieceOfFood(game);
 
          var foodObjects = screen.findObjectsNamed("food");
          foodObjects[0].draw(mockContextOne);
          foodObjects[1].draw(mockContextTwo);
 
          Assert.equal(mockContextOne.x, 1);
          Assert.equal(mockContextOne.y, 2);
          Assert.equal(mockContextTwo.x, 3);
          Assert.equal(mockContextTwo.y, 4); 
        }); 
      });
    });
  });
});
