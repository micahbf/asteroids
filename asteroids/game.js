(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.initAsteroids(10);

    var shipPos = [Math.floor(Game.DIM_X / 2), Math.floor(Game.DIM_Y / 2)];
    this.ship = new Asteroids.Ship(shipPos, [0, 0]);
    console.log(this.ship)
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;

  Game.prototype.initAsteroids = function (numAsteroids) {
    var asteroids = []
    for(var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }

    return asteroids;
  }

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if(this.asteroids[i].isCollidedWith(this.ship)) {
        window.alert("You lose.");
        this.stop();
      }
    }
  }

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var that = this;
    this.asteroids.forEach(function(asteroid){
      asteroid.draw(that.ctx);
    });

    this.ship.draw(that.ctx);
  }

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });

    this.ship.move();
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();

    this.checkCollisions();
  }

  Game.prototype.start = function() {
    var that = this;
    this.timerId = window.setInterval(function() {
      that.step();
    }, 50);
  }

  Game.prototype.stop = function() {
    window.clearInterval(this.timerId);
  }
})();
