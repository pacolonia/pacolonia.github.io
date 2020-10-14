"use strict";
exports.__esModule = true;
exports.countBits = void 0;
function countBits(n) {
    //return n.toString(2).split('').filter(c => c === '1').length;
    //return n.toString(2).replace(/0/g, '').length;
    return n.toString(2).split('').map(Number).filter(Boolean); //.length;
}
exports.countBits = countBits;
console.log(countBits(1234));
