import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part One
var currentFloor = 0;

for(var i = 0; i < input.length; i++) {
	var char = input[i];
	if(char == "(") {
		currentFloor++;
	} else if(char == ")") {
		currentFloor--;
	}
}

console.log(`Santa is on floor ${currentFloor} after following the instructions.`);

// Part Two
currentFloor = 0;
var santaFirstTimeEnterBasementIndex = -1;
for(var i = 0; i < input.length; i++) {
	var char = input[i];
	if(char == "(") {
		currentFloor++;
	} else if(char == ")") {
		currentFloor--;
	}
	if(currentFloor == -1) {
		santaFirstTimeEnterBasementIndex = i + 1;
		break;
	}
}

console.log(`Santa enters the basement at position ${santaFirstTimeEnterBasementIndex}.`);