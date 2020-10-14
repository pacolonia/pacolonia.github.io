function openOrSenior(data){
  return data.map(member => ((member[0]>=55) && (member[1]>7))? 'Senior' : 'Open');
}

let candidates = [[18, 20],[45, 2],[61, 12],[37, 6],[21, 21],[78, 9]];
console.log(openOrSenior(candidates));