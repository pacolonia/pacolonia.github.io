export function reverseWords(str: string): string {
    function reverseWord(word: string): string {
        let rev: string[] =[];
        for(let i = word.length-1, j = 0; i>=0 ; i--, j++) {
            rev[j] = word[i];
        }
        return rev.join("");
    }

    let res: string = str.split(" ").map(word => reverseWord(word)).join(" ");
    return res;
}

let phrase: string = "How  do you do?";
console.log(reverseWords(phrase));