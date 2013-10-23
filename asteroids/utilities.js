Function.prototype.inherits = function (parentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
}