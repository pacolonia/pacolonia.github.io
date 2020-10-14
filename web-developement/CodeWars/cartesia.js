function isValidWalk(walk) {
  let ns = 0;
  let ew = 0;

  // count the times you go up, right, subtract times you go down, left.
  for(let i = 0; i < walk.length; i++) {
    console.log(walk[i]);
    switch(walk[i]){
      case 'n':
        ns++;
        break;
      case 's':
        ns--;
        break;
      case 'e':
        ew++;
        break;
      case 'w':
        ew--;
        break;
    }
  }

  console.log(ns);
  console.log(ew);
  // if the times up - down and times right - left is 0, you're at the same spot.
  // the walk, array, hast to be exactly 10 blocks long, i.e. 10 minutes walk.
  if((ns == 0) && (ew == 0) && (walk.length == 10)) {
    return true;
  } else {
    return false;
  }
}

var walk = ['n', 'e', 'n', 'e', 's', 'w', 's', 'w'];
console.log(isValidWalk(walk));