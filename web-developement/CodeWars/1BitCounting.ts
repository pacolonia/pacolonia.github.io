export function countBits(n: number) {
    let binaryS: string = "";
    let quotient: number = n;
    let remainder: number = 0;

    while(quotient !== 0) {
        remainder = (quotient % 2);
        binaryS = remainder + binaryS;
        quotient = Math.floor(quotient / 2);
    }
    
    let counter: number = 0;
    binaryS.split("").forEach(e => {
        if(e == '1') counter++;
    });
    return counter;
}

console.log(countBits(1234));