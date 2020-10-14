function arrayDiff(a, b) {
    for (let i = 0; i < b.length; i++) {
        a = a.filter(e => !(e === b[i]));
    }
    return a;
}

let A = [1, 2, 2, 2, 2, 3];
let B = [1, 3];
console.log(arrayDiff(A, B));