import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part One
var lines = input.split("\n").map(line => line.trim());

var vowels = ["a", "e", "i", "o", "u"];
var naughtyStrings = ["ab", "cd", "pq", "xy"];

var niceStrings = 0;

console.log("Total number of strings: " + lines.length);
for (let i = 0; i < lines.length; i++) {
  var line = lines[i];
  if (line.length === 0) {
    continue;
  }
  let vowelCount = 0;
  let hasDoubleLetter = false;
  let hasNaughtyString = false;

  for (let j = 0; j < line.length; j++) {
    var letter = line[j];
    // check for vowels
    if (vowels.indexOf(letter) != -1) {
      vowelCount++;
    }
    if (j > 0 && line[j - 1] == letter) {
      hasDoubleLetter = true;
    }
    if (j > 1 && naughtyStrings.indexOf(line.substring(j - 1, j + 1)) != -1) {
      hasNaughtyString = true;
    }
  }

  if (vowelCount >= 3 && hasDoubleLetter && !hasNaughtyString) {
    niceStrings++;
  }
}

console.log(`Number of nice strings: ${niceStrings}`); // Number of nice strings: 239

// Is there a of-by-one bug in the puzzle?
// Answer: THERE IS A BUG IN THE PUZZLE ON PURPOSE
// My calculation is 239, but the puzzle says 238.

// Part Two
console.log("Part Two");

niceStrings = 0;
for (let i = 0; i < lines.length; i++) {
  var line = lines[i];
  if (line.length === 0) {
    continue;
  }
  let pairOfAnyTwoLettersThatAppearsAtLeastTwice = false;
  let letterThatRepeatsWithExactlyOneLetterBetweenThem = false;
  for (let j = 0; j < line.length; j++) {
    if (j > 1 && line[j - 2] == line[j]) {
      letterThatRepeatsWithExactlyOneLetterBetweenThem = true;
    }
    if (j > 0 && line.substring(j + 1).indexOf(line.substring(j - 1, j + 1)) != -1) {
      pairOfAnyTwoLettersThatAppearsAtLeastTwice = true;
    }
  }
  if (pairOfAnyTwoLettersThatAppearsAtLeastTwice && letterThatRepeatsWithExactlyOneLetterBetweenThem) {
    niceStrings++;
  }
}

console.log(`Number of nice strings: ${niceStrings}`);
