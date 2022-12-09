// Day 8: Treetop Tree House
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

var totalCount: number = 0;

// split input into rows and columns
const grid = input
  .split("\n")
  .map((row) => row.split("").map((x) => parseInt(x)));

function isTreeVisible(treeX: number, treeY: number): boolean {
  // if the tree is on the edge of the grid, it is visible
  var treeHight = grid[treeY][treeX];
  if (
    treeX == 0 ||
    treeX == grid[0].length ||
    treeY == 0 ||
    treeY == grid.length
  ) {
    return true;
  }

  // if tree is larger than all the trees to the left, it is visible
  var leftTrees = grid[treeY].slice(0, treeX);
  if (treeHight > Math.max(...leftTrees)) {
    return true;
  }

  // if tree is larger than all the trees to the right, it is visible
  var rightTrees = grid[treeY].slice(treeX + 1);
  if (treeHight > Math.max(...rightTrees)) {
    return true;
  }

  // if tree is larger than all the trees above, it is visible
  var aboveTrees = grid.slice(0, treeY).map((row) => row[treeX]);
  if (treeHight > Math.max(...aboveTrees)) {
    return true;
  }

  // if tree is larger than all the trees below, it is visible
  var belowTrees = grid.slice(treeY + 1).map((row) => row[treeX]);
  if (treeHight > Math.max(...belowTrees)) {
    return true;
  }

  // if not visible, return false
  return false;
}

// for each side of the grid, calculate the number of visible trees
for (let i = 0; i < grid.length; i++) {
  var count: number = 0;
  var row = grid[i];
  for (let j = 0; j < row.length; j++) {
    // reverse the row and calculate the index
    if (isTreeVisible(j, i)) {
      count++;
    }
  }
  totalCount += count;
}

// Total number of visible trees: 1785
console.log(`Total number of visible trees: ${totalCount}`);
