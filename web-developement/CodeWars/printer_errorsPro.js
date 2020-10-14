function printerError(s) {
  console.log(s.match(/[^a-m]/g));
  return s.match(/[^a-m]/g).length + "/" + s.length;
}

s="zaaaxbbbbyyhwawiwjjjwwm";
console.log(printerError(s));