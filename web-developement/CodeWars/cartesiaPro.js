function isValidWalk(walk) {
  function count(element) {
    return walk.filter(e => e === element).length;
  }
  return walk.length==10 && count('n')==count('s') && count('e')==count('w');
}

var walk = ['n', 'e', 'n', 'e', 's', 'w', 's', 'w', 'w', 'e'];
console.log(isValidWalk(walk));