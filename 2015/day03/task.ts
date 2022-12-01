import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part One
var housesReceivedAtLeastOnePresent = new Set();
var x = 0;
var y = 0;
for (let i = 0; i < input.length; i++) {
  var symbol: string = input[i];

  if (symbol == "^") {
    // go up
    y++;
  } else if (symbol == ">") {
    // go right
    x++;
  } else if (symbol == "v") {
    // go down
    y--;
  } else if (symbol == "<") {
    // go left
    x--;
  }

  housesReceivedAtLeastOnePresent.add(`${x},${y}`);

  // if(!housesReceivedAtLeastOnePresent.has(`${x},${y}`)) {

  // }
}

console.log(
  `Houses that received at least one present: ${housesReceivedAtLeastOnePresent.size}`
);



