var add = (function() {
  var counter = 0;
  function increment() {
    return counter += 1;
  }
  return increment;
})();

console.log(add());
console.log(add());
console.log(add());