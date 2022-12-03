import * as fs from "fs";
import * as path from "path";
import { arrayBuffer } from "stream/consumers";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Day 3: Rucksack Reorganization Part One
var lines = input.split("\n");

var sumOfTheItemTypePriorities = 0;

for (var i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  var indices: number[] = [];
  var rucksack = lines[i].trim();
  console.log(`Rucksack: ${rucksack}`);
  var rucksack1 = rucksack.substring(0, rucksack.length / 2);
  console.log(`Compartment 1: ${rucksack1}`);
  var compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length);
  console.log(`Compartment 2: ${compartment2}`);

  for (let j = 0; j < rucksack1.length; j++) {
    if (compartment2.indexOf(rucksack1[j]) > -1) {
      indices.push(rucksack1.indexOf(rucksack1[j]));
      console.log(`${rucksack1.indexOf(rucksack1[j])}`);
    }
  }

  console.log(`indices: ${indices}`);
  var uniqIndices = indices.filter((v, i, a) => a.indexOf(v) === i);
  console.log(`uniqIndices: ${uniqIndices}`);

  for (let j = 0; j < uniqIndices.length; j++) {
    console.log(
      `Letter: ${
        rucksack1[uniqIndices[j]]
      } CharCode: ${rucksack1.charCodeAt(uniqIndices[j])}`
    );

    if (
      rucksack1.charCodeAt(uniqIndices[j]) > 96 &&
      rucksack1.charCodeAt(uniqIndices[j]) < 123
    ) {
      // The letter is lowercase
      // a = 1
      // z = 26
      sumOfTheItemTypePriorities +=
        rucksack1.charCodeAt(uniqIndices[j]) - 96;
    } else if (
      rucksack1.charCodeAt(uniqIndices[j]) > 64 &&
      rucksack1.charCodeAt(uniqIndices[j]) < 91
    ) {
      // The letter is uppercase
      // A = 27
      // Z = 52
      sumOfTheItemTypePriorities +=
        rucksack1.charCodeAt(uniqIndices[j]) - 38;
    }
  }
}

// Sum of the item type priorities: 7746
console.log(`Part One: Sum of the priorities: ${sumOfTheItemTypePriorities}`);

// Day 3: Rucksack Reorganization Part Two

sumOfTheItemTypePriorities = 0;

// for (var i = 0; i < 1; i = i + 3) {
for (var i = 0; i < lines.length; i = i + 3) {
  var rucksack1 = lines[i].trim();
  var rucksack2 = lines[i + 1].trim();
  var rucksack3 = lines[i + 2].trim();
  var indices: number[] = [];

  
  for (let j = 0; j < rucksack1.length; j++) {
    if (rucksack2.indexOf(rucksack1[j]) > -1 && rucksack3.indexOf(rucksack1[j]) > -1) {
      indices.push(rucksack1.indexOf(rucksack1[j]));
    }
  }

  var uniqIndices = indices.filter((v, i, a) => a.indexOf(v) === i);

  for (let j = 0; j < uniqIndices.length; j++) {
    console.log(
      `Letter: ${
        rucksack1[uniqIndices[j]]
      } CharCode: ${rucksack1.charCodeAt(uniqIndices[j])}`
    );

    if (
      rucksack1.charCodeAt(uniqIndices[j]) > 96 &&
      rucksack1.charCodeAt(uniqIndices[j]) < 123
    ) {
      // The letter is lowercase
      // a = 1
      // z = 26
      sumOfTheItemTypePriorities +=
        rucksack1.charCodeAt(uniqIndices[j]) - 96;
    } else if (
      rucksack1.charCodeAt(uniqIndices[j]) > 64 &&
      rucksack1.charCodeAt(uniqIndices[j]) < 91
    ) {
      // The letter is uppercase
      // A = 27
      // Z = 52
      sumOfTheItemTypePriorities +=
        rucksack1.charCodeAt(uniqIndices[j]) - 38;
    }
  }
}

console.log(`Part two: Sum of the priorities: ${sumOfTheItemTypePriorities}`);