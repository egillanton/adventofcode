// Day 14: Regolith Reservoir
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
var lines = input.split("\n").map((line) => line.trim());

var stonesPositions: { distanceRight: number; distanceDown: number }[] = [];

// Map out the cave system
for (let i = 0; i < lines.length; i++) {
  var line = lines[i];
  var numberPairs = line.split(" -> ");
  for (let j = 1; j < numberPairs.length; j++) {
    var [prevDistanceRight, prevDistanceDown] = numberPairs[j - 1]
      .split(",")
      .map((n) => parseInt(n));
    var [distanceRight, distanceDown] = numberPairs[j]
      .split(",")
      .map((n) => parseInt(n));

    // Loop through the positions between the two points and add them to the stonesPositions array
    if (prevDistanceRight < distanceRight) {
      for (let k = prevDistanceRight; k <= distanceRight; k++) {
        stonesPositions.push({
          distanceRight: k,
          distanceDown: prevDistanceDown,
        });
      }
    } else if (prevDistanceRight > distanceRight) {
      for (let k = distanceRight; k <= prevDistanceRight; k++) {
        stonesPositions.push({
          distanceRight: k,
          distanceDown: prevDistanceDown,
        });
      }
    } else if (prevDistanceRight == distanceRight) {
      if (prevDistanceDown < distanceDown) {
        for (let k = prevDistanceDown; k <= distanceDown; k++) {
          stonesPositions.push({
            distanceRight: prevDistanceRight,
            distanceDown: k,
          });
        }
      } else if (prevDistanceDown > distanceDown) {
        for (let k = distanceDown; k <= prevDistanceDown; k++) {
          stonesPositions.push({
            distanceRight: prevDistanceRight,
            distanceDown: k,
          });
        }
      }
    }
  }
}

var minDistanceRight = Math.min(...stonesPositions.map((p) => p.distanceRight)) - 1;
var maxDistanceRight = Math.max(...stonesPositions.map((p) => p.distanceRight)) + 1;
var minDistanceDown = 0;
var maxDistanceDown = Math.max(...stonesPositions.map((p) => p.distanceDown)) + 1;

// console.log("Map dimensions:");
// console.log(`Min distance right: ${minDistanceRight}`);
// console.log(`Max distance right: ${maxDistanceRight}`);
// console.log(`Min distance down: ${minDistanceDown}`);
// console.log(`Max distance down: ${maxDistanceDown}`);


var map = new Array(maxDistanceDown + 1)
  .fill(0)
  .map(() => new Array(maxDistanceRight - minDistanceRight + 1).fill(""));
for (let i = minDistanceDown; i <= maxDistanceDown; i++) {
  for (let j = minDistanceRight; j <= maxDistanceRight; j++) {
    if (i == 0 && j == 500) {
      map[i][j - minDistanceRight] = "+";
    } else if (
      stonesPositions.some((p) => p.distanceRight == j && p.distanceDown == i)
    ) {
      map[i][j - minDistanceRight] = "#";
    } else {
      map[i][j - minDistanceRight] = ".";
    }
  }
}

// console.log("Map has been created successfully!");

function printMap({
  map,
  maxDistanceRight,
  minDistanceRight,
  minDistanceDown,
  maxDistanceDown,
  separator,
  showHeader = true,
}: {
  map: string[][];
  maxDistanceRight: number;
  minDistanceRight: number;
  minDistanceDown: number;
  maxDistanceDown: number;
  separator: string;
  showHeader: boolean;
}) {
  if (showHeader) {
    console.log(
      new Array(maxDistanceRight - minDistanceRight + 1)
        .fill(0)
        .map((_, i) => i + minDistanceRight)
        .join(separator)
    );
  }

  // Print the map
  for (let i = minDistanceDown; i <= maxDistanceDown; i++) {
    console.log(map[i].join(separator));
  }
}


// Part 1 - How many units of sand come to rest before sand starts flowing into the abyss below?
var sandUnits = 0;
var reachedTheAbyss = false;
while(!reachedTheAbyss){
  var sandPosition = { distanceRight: 500, distanceDown: 1 };
  // Move the sand down until it reaches the abyss or comes to rest

  var sandHalted = false;
  while (!sandHalted) {
    if(sandPosition.distanceDown == maxDistanceDown){
      reachedTheAbyss = true;
      // console.log("Sand reached the abyss!");
      break;
    }

    
    if(map[sandPosition.distanceDown][sandPosition.distanceRight - minDistanceRight] != "."){
      reachedTheAbyss =true;
      break;
    }
    
    // Check if the sand can move down one position
    if (map[sandPosition.distanceDown + 1][sandPosition.distanceRight - minDistanceRight] == ".") {
      sandPosition.distanceDown++;
      // console.log("Sand moves down");
      continue;
    }

    // Check if the sand can move down one and left by one
    if (map[sandPosition.distanceDown + 1][sandPosition.distanceRight - minDistanceRight - 1] == ".") {
      sandPosition.distanceDown++;
      sandPosition.distanceRight--;
      // console.log("Sand moves down and left");
      continue;
    }

    // Check if the sand can move down one and right by one
    if (map[sandPosition.distanceDown + 1][sandPosition.distanceRight - minDistanceRight + 1] == ".") {
      sandPosition.distanceDown++;
      sandPosition.distanceRight++;
      // console.log("Sand moves down and right");
      continue;
    }

    // Sand can't move down, so it must have come to rest
    // console.log("Sand came to rest at position: " + sandPosition.distanceRight + "," + sandPosition.distanceDown);
    map[sandPosition.distanceDown][sandPosition.distanceRight - minDistanceRight] = "O";
    sandUnits++;
    sandHalted = true;
  }
}

printMap({
  map,
  maxDistanceRight,
  minDistanceRight,
  minDistanceDown,
  maxDistanceDown,
  separator: "",
  showHeader: false,
});

// Number of sand units that come to rest: 793
console.log(`Number of sand units that come to rest: ${sandUnits}`);