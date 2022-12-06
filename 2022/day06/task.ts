import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Day 6: Tuning Trouble
var distinctCharacters = 14;
var sum = 0;

var chars = input.trim().split("");
for (var i = (distinctCharacters-1); i < chars.length; i++) {
  var set = new Set();

  for (var j = (distinctCharacters-1); j >= 0; j--) {
    set.add(chars[i-j]);
  }

  if(set.size == distinctCharacters) {
    sum += i;
    break;
  }
}

console.log(sum+1);
