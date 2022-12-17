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

var INSTRUCTIONS = parseInput(input);

function partOne() {
  var x = 1;
  var temp: number = null;
  var intervals = [20, 60, 100, 140, 180, 220];
  var intervalOutputs: number[] = [];
  var cycleCount = 1;

  var i = 0;
  var cpuBusy = false;
  while (i < INSTRUCTIONS.length || cpuBusy) {
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
      var instruction = INSTRUCTIONS[i];
      console.log(
        `DURING:${cycleCount}: Executing instruction: ${instruction.action}${
          instruction.delta ? " " + instruction.delta : ""
        }`
      );
      if (instruction.action == "addx") {
        temp = INSTRUCTIONS[i].delta;
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
}

// partOne();

// Part 2: What eight capital letters appear on your CRT?

const CRT_SIZE = {
  WIDTH: 40, // pixels
  HEIGHT: 6, // pixels
};

var crtGrid: string[][] = new Array(CRT_SIZE.HEIGHT)
  .fill("")
  .map(() => new Array(CRT_SIZE.WIDTH).fill("."));

function printCrtGrid(crtGrid: string[][]) {
  for (var i = 0; i < crtGrid.length; i++) {
    console.log(crtGrid[i].join(""));
  }
}

var x = 1;
var temp: number = null;
var cycleCount = 0;

var i = 0;
var cpuBusy = false;
while (i < INSTRUCTIONS.length || cpuBusy) {
	
	if(x  == cycleCount%CRT_SIZE.WIDTH || x == cycleCount%CRT_SIZE.WIDTH +1 || x == cycleCount%CRT_SIZE.WIDTH -1)
		crtGrid[Math.floor(cycleCount/CRT_SIZE.WIDTH)][cycleCount%CRT_SIZE.WIDTH] = "#";

  if (cpuBusy) {
	console.log(`Start cycle\t${cycleCount}: Register X is now ${x}`);
	console.log(
      `End of cycle\t${cycleCount}: finish executing addx ${temp} (Register X is now ${
        x + temp
      })`
    );
	console.log();
    cycleCount += 1;
    x += temp;
    temp = null;
    cpuBusy = false;
  } else {
    if (INSTRUCTIONS[i].action == "addx") {
      console.log(
        `Start cycle\t${cycleCount}: begin executing ${INSTRUCTIONS[i].action} ${INSTRUCTIONS[i].delta}`
      );
      temp = INSTRUCTIONS[i].delta;
      cpuBusy = true;
    } else{
		console.log(`Start cycle\t${cycleCount}: begin executing ${INSTRUCTIONS[i].action}`);
	}
    cycleCount += 1;
    i++;
	console.log(`End of cycle\t${cycleCount - 1}: ${x}`);
	console.log();
  }
}

printCrtGrid(crtGrid);

console.log("What eight capital letters appear on your CRT?");
console.log("Answer: FZBPBFZF"); // Answer: 14720
