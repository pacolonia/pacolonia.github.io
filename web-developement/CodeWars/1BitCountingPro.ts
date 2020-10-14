export function countBits(n: number) {
    //return n.toString(2).split('').filter(c => c === '1').length;
    //return n.toString(2).replace(/0/g, '').length;
    return n.toString(2).split('').map(Number).filter(Boolean).length;
}

console.log(countBits(1234));