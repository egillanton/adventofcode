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
  var compartment1 = rucksack.substring(0, rucksack.length / 2);
  console.log(`Compartment 1: ${compartment1}`);
  var compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length);
  console.log(`Compartment 2: ${compartment2}`);

  for (let j = 0; j < compartment1.length; j++) {
    if (compartment2.indexOf(compartment1[j]) > -1) {
      indices.push(compartment1.indexOf(compartment1[j]));
      console.log(`${compartment1.indexOf(compartment1[j])}`);
    }
  }

  console.log(`indices: ${indices}`);
  var uniqIndices = indices.filter((v, i, a) => a.indexOf(v) === i);
  console.log(`uniqIndices: ${uniqIndices}`);

  for (let j = 0; j < uniqIndices.length; j++) {
    console.log(
      `Letter: ${
        compartment1[uniqIndices[j]]
      } CharCode: ${compartment1.charCodeAt(uniqIndices[j])}`
    );

    if (
      compartment1.charCodeAt(uniqIndices[j]) > 96 &&
      compartment1.charCodeAt(uniqIndices[j]) < 123
    ) {
      // The letter is lowercase
      // a = 1
      // z = 26
      sumOfTheItemTypePriorities +=
        compartment1.charCodeAt(uniqIndices[j]) - 96;
    } else if (
      compartment1.charCodeAt(uniqIndices[j]) > 64 &&
      compartment1.charCodeAt(uniqIndices[j]) < 91
    ) {
      // The letter is uppercase
      // A = 27
      // Z = 52
      sumOfTheItemTypePriorities +=
        compartment1.charCodeAt(uniqIndices[j]) - 38;
    }
  }
}

// Sum of the item type priorities: 7746
console.log(`Sum of the priorities: ${sumOfTheItemTypePriorities}`);
