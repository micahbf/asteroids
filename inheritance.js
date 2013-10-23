Function.prototype.inherits = function (parentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
}

function Animal(species) {
  this.species = species
}

Animal.prototype.saySpecies = function () {
  console.log("Species: " + this.species);
}

function Dog(name) {
  Animal.call(this, "dogus maximus");
  this.name = name
}

Dog.inherits(Animal)

Dog.prototype.sayName = function () {
  console.log("Name: " + this.name);
}

a = new Animal("birdus minimus")
d = new Dog("Fido")

a.saySpecies();
// a.sayName();
d.saySpecies();
d.sayName();