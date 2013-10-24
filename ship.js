(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);

    this.angle = 0;
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "blue";

  Ship.prototype.power = function() {
    var rotationAngle = -(this.angle + Math.PI /2)
    var nx = Math.sin(rotationAngle);
    var ny = -Math.cos(rotationAngle);
    this.vel[0] += ny;
    this.vel[1] += nx;
  }

  Ship.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.vel[0] *= 0.95;
    this.vel[1] *= 0.95;
  }

  Ship.prototype.changeDirection = function(direction) {
    this.angle += direction * 0.6;
    this.angle += (2 * Math.PI);
    this.angle %= (2 * Math.PI);
  }

  Ship.prototype.fireBullet = function() {
    var rotationAngle = -(this.angle + Math.PI /2)
    var nx = Math.sin(rotationAngle);
    var ny = -Math.cos(rotationAngle);
    var velocity = [ny, nx].map(function(elem) {
      return Math.floor(elem * Asteroids.Bullet.SPEED);
    });

    var position = [this.pos[0], this.pos[1]];
    return new Asteroids.Bullet(position, velocity);
  }

  Ship.prototype.draw = function(ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.moveTo(0, -7);
    ctx.lineTo(-3, 3);
    ctx.lineTo(3, 3);
    ctx.closePath();

    ctx.fill();

    ctx.rotate(0 - this.angle);
    ctx.translate(0-this.pos[0], 0-this.pos[1]);
  }
})();
