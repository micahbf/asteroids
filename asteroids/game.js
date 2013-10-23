(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.initAsteroids(10);

    var shipPos = [Math.floor(Game.DIM_X / 2), Math.floor(Game.DIM_Y / 2)];
    this.ship = new Asteroids.Ship(shipPos, [0, 0]);
    console.log(this.ship)
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;

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

  Game.prototype.moveAsteroids = function() {
    var badAsteroids = [];
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i]
      asteroid.move();
      if (asteroid.pos[0] < 0 || asteroid.pos[0] > Game.DIM_X ||
          asteroid.pos[1] < 0 || asteroid.pos[1] > Game.DIM_Y) {
            badAsteroids.push(asteroid)
      }
    }

    var that = this;

    badAsteroids.forEach(function(asteroid) {
      var asteroidIndex = that.asteroids.indexOf(asteroid);
      that.asteroids.splice(asteroidIndex, 1);
    })
  }

  Game.prototype.move = function() {
    this.moveAsteroids();
    this.ship.move();
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();

    this.checkCollisions();
  }

  Game.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.timerId = window.setInterval(function() {
      that.step();
    }, 50);
  }

  Game.prototype.stop = function() {
    window.clearInterval(this.timerId);
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this
    key('up', function () {
      that.ship.power([0, -1]);
    });
    key('down', function () {
      that.ship.power([0, 1]);
    });
    key('left', function () {
      that.ship.power([-1, 0]);
    });
    key('right', function () {
      that.ship.power([1, 0]);
    });
  }
})();
