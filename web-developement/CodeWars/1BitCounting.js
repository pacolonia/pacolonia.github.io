"use strict";
exports.__esModule = true;
exports.countBits = void 0;
function countBits(n) {
    var binaryS = "";
    var quotient = n;
    var remainder = 0;
    while (quotient !== 0) {
        remainder = (quotient % 2);
        binaryS = remainder + binaryS;
        quotient = Math.floor(quotient / 2);
    }
    var counter = 0;
    binaryS.split("").forEach(function (e) {
        if (e == '1')
            counter++;
    });
    return counter;
}
exports.countBits = countBits;
console.log(countBits(1234));
