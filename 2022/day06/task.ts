import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Day 6: Tuning Trouble

var lines = input.split("\n");

var sum = 0;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var chars = line.split("");
  for (var j = 3; j < chars.length; j++) {
    var set = new Set();
    set.add(chars[j-3]);
    set.add(chars[j-2]);
    set.add(chars[j-1]);
    set.add(chars[j]);
    console.log(set)
    console.log(set.size)
    if(set.size == 4) {
      sum += j;
      break;
    }
  }
}

console.log(sum+1);
