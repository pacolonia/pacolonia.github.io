function printerError(s) {
  return s.split("")
  .map((ch, index) => s.charCodeAt(s.indexOf(ch, index)))
  .filter(code => (code < "a".charCodeAt(0)) || (code >"m".charCodeAt(0)))
  .length
  + "/" + s.length;
}

s="zaaaxbbbbyyhwawiwjjjwwm";
console.log(printerError(s));