// Day 9: Rope Bridge
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part 1
var positionsVisited = 0;

console.log("How many positions does the tail of the rope visit at least once?");
console.log("Answer:", positionsVisited); 