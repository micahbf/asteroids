(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.initAsteroids(10);
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;

  Game.prototype.initAsteroids = function (numAsteroids) {
    var asteroids = []
    for(var i = 0; i< numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }

    return asteroids;
  }

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    var that = this;
    this.asteroids.forEach(function(asteroid){
      asteroid.draw(that.ctx);
    });
  }

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();
  }

  Game.prototype.start = function() {
    var that = this;
    window.setInterval(function() {
      that.step();
    }, 50);
  }
})();
