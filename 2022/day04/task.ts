import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Day 4: Camp Cleanup Part one
var lines = input.split("\n");

// Number of assignment pairs does one range fully contain the other
var oneRangeFullyContainTheOther = 0;

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var ranges = line.split(",");
  var range1 = ranges[0].split("-");
  var range2 = ranges[1].split("-");
  var range1Start = parseInt(range1[0]);
  var range1End = parseInt(range1[1]);
  var range2Start = parseInt(range2[0]);
  var range2End = parseInt(range2[1]);

  console.log(`Range 1: ${range1Start} - ${range1End}`);
  console.log(`Range 2: ${range2Start} - ${range2End}`);

  if (
    (range1Start <= range2Start && range2End <= range1End) ||
    (range2Start <= range1Start && range1End <= range2End)
  ) {
    console.log("One range fully contains the other");
    console.log(`Range 1: ${range1Start} - ${range1End}`);
    console.log(`Range 2: ${range2Start} - ${range2End}`);
    oneRangeFullyContainTheOther++;
  }
}

// Answer: 305
console.log(oneRangeFullyContainTheOther);

var overlapCount = 0;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var ranges = line.split(",");
  var range1 = ranges[0].split("-");
  var range2 = ranges[1].split("-");
  var range1Start = parseInt(range1[0]);
  var range1End = parseInt(range1[1]);
  var range2Start = parseInt(range2[0]);
  var range2End = parseInt(range2[1]);

  console.log(`Range 1: ${range1Start} - ${range1End}`);
  console.log(`Range 2: ${range2Start} - ${range2End}`);

  // Minor change to the part one
  if (
    (range1Start <= range2Start && range2Start <= range1End) ||
    (range2Start <= range1Start && range1Start <= range2End)
  ) {
    console.log("One range fully contains the other");
    console.log(`Range 1: ${range1Start} - ${range1End}`);
    console.log(`Range 2: ${range2Start} - ${range2End}`);
    overlapCount++;
  }
}

// Answer: 811
console.log(overlapCount);