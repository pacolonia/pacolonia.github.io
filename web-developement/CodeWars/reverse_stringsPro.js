"use strict";
exports.__esModule = true;
exports.reverseWords = void 0;
function reverseWords(str) {
    return str.split(" ").map(function (word) { return word.split("").reverse().join(""); }).join(" ");
}
exports.reverseWords = reverseWords;
var phrase = "How  do you do?";
console.log(reverseWords(phrase));
