// Day 8: Treetop Tree House
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

var totalCount: number = 0;

// split input into rows and columns
const grid = input
  .split("\n").map((x) => x.trim())
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

// Part two

function isVisible(
  currentTreeHight: number,
  currentTallestTreeHeight: number,
  mainTreeHight: number
) {

  // If there is no tree return false
  if(currentTreeHight == 0){
    return false;
  }

  // If this is the first tree, return true
  if (currentTallestTreeHeight == 0) {
    return true;
  }

  // If the tree is smaller than the main tree, it is only visible if the is not a large tree blocking the tree 
  if (
    currentTreeHight < mainTreeHight &&
    currentTallestTreeHeight < mainTreeHight
  ) {
    return true;
  }

  if (
    currentTreeHight > mainTreeHight &&
    currentTreeHight > currentTallestTreeHeight
  ) {
    return true;
  }

  // console.log(`currentTreeHight: ${currentTreeHight}, currentTallestTreeHeight: ${currentTallestTreeHeight}, mainTreeHight: ${mainTreeHight}`)
  
  return false;
}

function getScenicScore(treeX: number, treeY: number): number {
  var treeHight = grid[treeY][treeX];
  var leftTrees = grid[treeY].slice(0, treeX);
  var rightTrees = grid[treeY].slice(treeX + 1);
  var aboveTrees = grid.slice(0, treeY).map((row) => row[treeX]);
  var belowTrees = grid.slice(treeY + 1).map((row) => row[treeX]);

  // for loop reverse list
  var currentTallestLeftHight = 0;
  var visibleTreesToTheLeft = 0;
  for (let i = leftTrees.length - 1; i >= 0; i--) {
    let leftTree = leftTrees[i];
    // console.log(leftTree);
    // visibleTreesToTheLeft = isVisible(
    //   leftTree,
    //   currentTallestLeftHight,
    //   treeHight
    // )
    //   ? visibleTreesToTheLeft + 1
    //   : visibleTreesToTheLeft;

    if(leftTree === 0) continue;
    if(leftTree < treeHight) {
      visibleTreesToTheLeft++;
    } else if (leftTree >= treeHight) {
      visibleTreesToTheLeft++;
      break;
    }
    // if (leftTree > currentTallestLeftHight) {
    //   currentTallestLeftHight = leftTree;
    // }
  }

  var currentTallestRightHight = 0;
  var visibleTreesToTheRight = 0;
  for (let i = 0; i < rightTrees.length; i++) {
    let rightTree = rightTrees[i];
    // console.log(rightTree);
    // visibleTreesToTheRight = isVisible(
    //   rightTree,
    //   currentTallestRightHight,
    //   treeHight
    // )
    //   ? visibleTreesToTheRight + 1
    //   : visibleTreesToTheRight;

    // if (rightTree > currentTallestRightHight) {
    //   currentTallestRightHight = rightTree;
    // }
    if(rightTree === 0) continue;
    if(rightTree < treeHight) {
      visibleTreesToTheRight++;
    }
    else if (rightTree >= treeHight) {
      visibleTreesToTheRight++;
      break;
    }

  }

  var currentTallestAboveHight = 0;
  var visibleTreesAbove = 0;
  for (let i = aboveTrees.length - 1; i >= 0; i--) {
    var aboveTree = aboveTrees[i];
    // console.log(aboveTree);
    // visibleTreesAbove = isVisible(
    //   aboveTree,
    //   currentTallestAboveHight,
    //   treeHight
    // )
    //   ? visibleTreesAbove + 1
    //   : visibleTreesAbove;

    // if (aboveTree > currentTallestAboveHight) {
    //   currentTallestAboveHight = aboveTree;
    // }
    if(aboveTree === 0) continue;
    if(aboveTree < treeHight) {
      visibleTreesAbove++;
    }
    else if (aboveTree >= treeHight) {
      visibleTreesAbove++;
      break;
    }
  }

  var currentTallestBelowHight = 0;
  var visibleTreesBelow = 0;
  for (let i = 0; i < belowTrees.length; i++) {
    var belowTree = belowTrees[i];
    // console.log(belowTree);
    // visibleTreesBelow = isVisible(
    //   belowTree,
    //   currentTallestBelowHight,
    //   treeHight
    // )
    //   ? visibleTreesBelow + 1
    //   : visibleTreesBelow;

    // if (belowTree > currentTallestBelowHight) {
    //   currentTallestBelowHight = belowTree;
    // }
    if(belowTree === 0) continue;
    if(belowTree < treeHight) {
      visibleTreesBelow++;
    }
    else if (belowTree >= treeHight) {
      visibleTreesBelow++;
      break;
    }
  }

  return (
    visibleTreesToTheLeft *
    visibleTreesToTheRight *
    visibleTreesAbove *
    visibleTreesBelow
  );
}

var maxScenicScore = 0;
var maxScenicScoreX = 0;
var maxScenicScoreY = 0;
var maxScenicScoreTreeHeight;

for (let i = 0; i < grid.length; i++) {
  var count = 0;
  var row = grid[i];
  for (let j = 0; j < row.length; j++) {
    var scenicScore = getScenicScore(j, i);
    // console.log(`Scenic score for ${j}, ${i}: ${scenicScore}`);
    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
      maxScenicScoreX = j;
      maxScenicScoreY = i;
      maxScenicScoreTreeHeight = grid[i][j];
    }
  }
}

// Max scenic score: 0
console.log(
  `Max scenic score: ${maxScenicScore}` +
    ` at ${maxScenicScoreX}, ${maxScenicScoreY} with a tree height of ${maxScenicScoreTreeHeight}`
);


// var x = 4;
// var y = 4;
// // var scenicScore = getScenicScore(x,y);
// // console.log(`Scenic score for ${x},${y} 1: ${scenicScore}`);

// var leftTrees = grid[y].slice(0, x);
// var rightTrees = grid[y].slice(x + 1, grid[y].length);
// var aboveTrees = grid.slice(0, y).map((row) => row[x]);
// var belowTrees = grid.slice(y + 1).map((row) => row[x]);

// console.log(`Current tree: ${grid[y][x]}`);
// console.log(`leftTrees: ${leftTrees}`);
// console.log(`rightTrees: ${rightTrees}`);
// console.log(`aboveTrees: ${aboveTrees}`);
// console.log(`belowTrees: ${belowTrees}`);
// console.log(isVisible(5, 9, 0) ? "visible" : "not visible");