(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel, radius) {
    MovingObject.call(this, pos, vel, radius, Asteroid.COLOR)
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.RADIUS = 25;
  Asteroid.COLOR = "red";

  var randomVel = function (min, max) {
    var xSign = (Math.random() > 0.5) ? 1 : -1;
    var ySign = (Math.random() > 0.5) ? 1 : -1;
    var xMagnitude = Math.floor(Math.random() * (max - min + 1) + min);
    var yMagnitude = Math.floor(Math.random() * (max - min + 1) + min);

    return [(xSign * xMagnitude), (ySign * yMagnitude)];
  }

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var pos = [
      Math.floor(Math.random() * dimX),
      Math.floor(Math.random() * dimY)
    ];
    var velocity = randomVel(1, 5);
  }


})();