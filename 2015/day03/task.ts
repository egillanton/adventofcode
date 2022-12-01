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

// Part Two
var santaX = 0;
var santaY = 0;
var roboSantaX = 0;
var roboSantaY = 0;

housesReceivedAtLeastOnePresent = new Set();
housesReceivedAtLeastOnePresent.add(`${santaX},${santaY}`);

for (let i = 0; i < input.length; i++) {
  var symbol: string = input[i];

  if (i % 2 == 0) {
    // Santa moves
    if (symbol == "^") {
      // go up
      santaY++;
    } else if (symbol == ">") {
      // go right
      santaX++;
    } else if (symbol == "v") {
      // go down
      santaY--;
    } else if (symbol == "<") {
      // go left
      santaX--;
    }

    housesReceivedAtLeastOnePresent.add(`${santaX},${santaY}`);
  } else {
    // Robo-Santa moves
    if (symbol == "^") {
      // go up
      roboSantaY++;
    } else if (symbol == ">") {
      // go right
      roboSantaX++;
    } else if (symbol == "v") {
      // go down
      roboSantaY--;
    } else if (symbol == "<") {
      // go left
      roboSantaX--;
    }

    housesReceivedAtLeastOnePresent.add(`${roboSantaX},${roboSantaY}`);
  }
}

console.log(
  `Houses that received at least one present: ${housesReceivedAtLeastOnePresent.size}`
);
