var sum = function () {
  var total = 0;
  for(var i = 0; i < arguments.length; i++) {
    total += arguments[i]
  }

  return total;
}

Function.prototype.myBind = function(objectToBind) {
  var that = this;
  var args = Array.prototype.slice.call(arguments, 1, arguments.length);
  return function () {
    for(var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    that.apply(objectToBind, args)
  }
}

anyObj = {
  name: "herbert"
}

var hello = function(introduction, testStr) {
  console.log(introduction + this.name);
  console.log(testStr)
}

var myHello = hello.myBind(anyObj, "Hi my name is ");


var curriedSum = function(numArgs) {
  var numbers = [];
  var _curriedSum = function(num) {
    numbers.push(num);
    if(numbers.length == numArgs) {
      var total = 0
      for(var i = 0; i < numArgs; i++) {
        total += numbers[i];
      }
      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));



Function.prototype.curry = function(numArgs) {
  var that = this;
  var numbers = [];

  var _curry = function(num) {
    numbers.push(num);
    if(numbers.length == numArgs) {
      return that.apply(null, numbers);
    } else {
      return _curry;
    }
  };

  return _curry;
}

console.log(sum.curry(5)(1)(2)(3)(4)(5));