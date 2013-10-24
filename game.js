(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.initAsteroids(10);

    var shipPos = [Math.floor(Game.DIM_X / 2), Math.floor(Game.DIM_Y / 2)];
    this.ship = new Asteroids.Ship(shipPos, [0, 0]);

    this.bullets = [];
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

    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx);
    });
  }

  Game.prototype.moveObjects = function(movingObjects, wrapIfOutOfBounds) {
    var badObjects = []
    for (var i = 0; i < movingObjects.length; i++) {
      var object = movingObjects[i]
      object.move();
      if (this.isOutOfBounds(object)) {
        if(wrapIfOutOfBounds) {
          this.wrapObject(object);
        } else {
          badObjects.push(object);
        }
      }
    }

    // remove the bullets that go off the board
    for(var i = 0; i < badObjects.length; i++) {
      var object = badObjects[i];
      movingObjects.slice(movingObjects.indexOf(object), 1);
    }
  }

  Game.prototype.isOutOfBounds = function(movingObject) {
    return movingObject.pos[0] < 0 ||
           movingObject.pos[0] > Game.DIM_X ||
           movingObject.pos[1] < 0 ||
           movingObject.pos[1] > Game.DIM_Y
  }

  Game.prototype.wrapObject = function(object) {
    object.pos[0] += Game.DIM_Y;
    object.pos[0] %= Game.DIM_Y;
    object.pos[1] += Game.DIM_X;
    object.pos[1] %= Game.DIM_X;
  }

  Game.prototype.move = function() {
    this.moveObjects(this.asteroids, true);
    this.ship.move();
    this.wrapObject(this.ship);
    this.moveObjects(this.bullets, false);
    this.hitAsteroids();
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();

    this.checkCollisions();
  }

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet();
    if (bullet) {
      this.bullets.push(bullet);
    }
  }

  Game.prototype.hitAsteroids = function() {
    var that = this
    var badAsteroids = [];
    var badBullets = [];
    this.bullets.forEach(function(bullet) {
      that.asteroids.forEach(function(asteroid) {
        if (bullet.isCollidedWith(asteroid)) {
          badAsteroids.push(asteroid);
          badBullets.push(bullet)
        }
      });
    });

    badAsteroids.forEach(function(asteroid) {
      var asteroidIndex = that.asteroids.indexOf(asteroid);
      that.asteroids.splice(asteroidIndex, 1);
    });

    badBullets.forEach(function(bullet) {
      var bulletIndex = that.bullets.indexOf(bullet);
      that.bullets.splice(bulletIndex, 1);
    });
  }

  Game.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.timerId = window.setInterval(function() {
      that.step();
    }, 33);
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
      that.ship.changeDirection(-1);
    });
    key('right', function () {
      that.ship.changeDirection(1);
    });

    key('space', function () {
      that.fireBullet();
    });
  }
})();
