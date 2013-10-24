(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel, radius) {
    Asteroids.MovingObject.call(this, pos, vel, radius, Asteroid.COLOR)
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.RADIUS = 25;
  Asteroid.COLOR = "yellow";

  var randomVel = function (min, max) {
    var xSign = (Math.random() > 0.5) ? 1 : -1;
    var ySign = (Math.random() > 0.5) ? 1 : -1;
    var xMagnitude = Math.floor(Math.random() * (max - min + 1) + min);
    var yMagnitude = Math.floor(Math.random() * (max - min + 1) + min);

    return [(xSign * xMagnitude), (ySign * yMagnitude)];
  }

  var randomStartPos = function(dimX, dimY) {
    //generate new startPos which is not too close to ship startPos (center)
    var pos = [];
    var lastRand = Math.floor(Math.random() * dimX)
    while(lastRand > (dimX / 2 + 25) && lastRand < (dimX / 2 - 25)) {
      lastRand = Math.floor(Math.random() * dimX);
    }
    pos.push(lastRand);

    lastRand = Math.floor(Math.random() * dimY)
    while(lastRand > (dimX / 2 + 25) && lastRand < (dimY / 2 - 25)) {
      lastRand = Math.floor(Math.random() * dimY);
    }
    pos.push(lastRand);

    return pos;
  }

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var pos = randomStartPos(dimX, dimY);
    var velocity = randomVel(1, 3);

    return new Asteroid(pos, velocity, Asteroid.RADIUS);
  }


})();