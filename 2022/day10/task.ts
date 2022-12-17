// Day 10: Cathode-Ray Tube
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part 1: What is the sum of these six signal strengths?
var signalStrengthSum  = 0;

console.log("What is the sum of these six signal strengths?");
console.log("Answer:", signalStrengthSum); 