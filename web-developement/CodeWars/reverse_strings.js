"use strict";
exports.__esModule = true;
exports.reverseWords = void 0;
function reverseWords(str) {
    function reverseWord(word) {
        var rev = [];
        for (var i = word.length - 1, j = 0; i >= 0; i--, j++) {
            rev[j] = word[i];
        }
        return rev.join("");
    }
    var res = str.split(" ").map(function (word) { return reverseWord(word); }).join(" ");
    return res;
}
exports.reverseWords = reverseWords;
var phrase = "How  do you do?";
console.log(reverseWords(phrase));
