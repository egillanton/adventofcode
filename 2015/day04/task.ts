import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part One
import * as md5 from "md5";
var i = 0;
var hash = "";
while (hash.substring(0, 5) != "00000") {
  i++;
  hash = md5(input + i);
}

console.log(hash);
console.log(i);
