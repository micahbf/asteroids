(function() {
  var Asteroids = window.Asteroids = (window.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel; // vector []
    this.radius = radius;
    this.color = color;
  }

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var x_diff = this.pos[0] - otherObject.pos[0];
    var y_diff = this.pos[1] - otherObject.pos[1];

    var distance = Math.sqrt(x_diff * x_diff + y_diff * y_diff);

    return distance <= (this.radius + otherObject.radius);
  }
})();