(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    console.log(pos);
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function() {
    if(this.vel[0] === 0 && this.vel[1] === 0) {
      return null;
    }

    var denominator;
    if (Math.abs(this.vel[0]) > Math.abs(this.vel[1])) {
      denominator = this.vel[0];
    } else {
      denominator = this.vel[1];
    }
    denominator = Math.abs(denominator);

    var direction = [(this.vel[0] / denominator), (this.vel[1] / denominator)];
    var velocity = direction.map(function(elem) {
      return Math.floor(elem * Asteroids.Bullet.SPEED);
    });

    var position = [this.pos[0], this.pos[1]];
    return new Asteroids.Bullet(position, velocity);
  }
})();
