(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.SPEED = 5;
  Bullet.RADIUS = 2;
  Bullet.COLOR = "black";
})();
