// Day 10: Cathode-Ray Tube
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part 1: What is the sum of these six signal strengths?
type Instruction = {
  action: "addx" | "noop";
  delta?: number;
};

function parseInput(input: string) {
  var lines = input.split("\n");

  var instructions: Instruction[] = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.startsWith("addx")) {
      instructions.push({
        action: "addx",
        delta: parseInt(line.split(" ")[1], 10),
      } as Instruction);
    } else {
      instructions.push({
        action: "noop",
      } as Instruction);
    }
  }
  return instructions;
}

var x = 1;
var temp: number = null;
var intervals = [20, 60, 100, 140, 180, 220];
var intervalOutputs: number[] = [];
var cycleCount = 1;
var instructions = parseInput(input);

var i = 0;
var cpuBusy = false;
while (i < instructions.length || cpuBusy) {
  console.log(`START:${cycleCount}: ${x}`);
  if (intervals.includes(cycleCount)) {
    var intervalSignalStrength = cycleCount * x;
    intervalOutputs.push(intervalSignalStrength);
  }

  if (cpuBusy) {
    console.log(`DURING:${cycleCount}: ${x} -> ${x + temp}`);
    cycleCount += 1;
    x += temp;
    temp = null;
    cpuBusy = false;
  } else {
    var instruction = instructions[i];
    console.log(
      `DURING:${cycleCount}: Executing instruction: ${instruction.action}${
        instruction.delta ? " " + instruction.delta : ""
      }`
    );
    if (instruction.action == "addx") {
      temp = instructions[i].delta;
      cpuBusy = true;
    }
    cycleCount += 1;
    i++;
  }
  console.log(`END:${cycleCount - 1}: ${x}`);
  console.log();
}

// set signalStrengthSum as the sum of intervalOutputs
var signalStrengthSum = intervalOutputs.reduce((a, b) => a + b, 0);

for (let i = 0; i < intervalOutputs.length; i++) {
  console.log(
    `Signal strength at interval: ${intervals[i]} = ${intervalOutputs[i]}`
  );
}

console.log("What is the sum of these six signal strengths?");
console.log("Answer:", signalStrengthSum); // Answer: 14720