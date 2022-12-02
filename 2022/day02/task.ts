import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part One
// Rock paper scissors map
var actionToActionMap = new Map();
actionToActionMap.set("Rock", "Scissors"); // Rock beats scissors
actionToActionMap.set("Paper", "Rock"); // Paper beats rock
actionToActionMap.set("Scissors", "Paper"); // Scissors beats paper

var player1ActionMap = new Map();
player1ActionMap.set("A", "Rock"); // A = Rock
player1ActionMap.set("B", "Paper"); // B = Paper
player1ActionMap.set("C", "Scissors"); // C = Scissors

var player2ActionMap = new Map();
player2ActionMap.set("X", "Rock"); // X = Rock
player2ActionMap.set("Y", "Paper"); // Y = Paper
player2ActionMap.set("Z", "Scissors"); // Z = Scissors

var scoreMap = new Map();
scoreMap.set("Rock", 1); // If you win with rock, you get 1 point
scoreMap.set("Paper", 2); // If you win with paper, you get 2 points
scoreMap.set("Scissors", 3); // If you win with scissors, you get 3 points // Player 1 wins

var totalScore = 0;
var lines = input.split("\n");

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var [player1Action, player2Action] = line.split(" ").map((x) => x.trim());
  // console.log(
  //   `Player 1 action: ${player1Action}, Player 2 action: ${player2Action}`
  // );
  var player1ActionName = player1ActionMap.get(player1Action);
  // console.log(player1ActionName);
  var player2ActionName = player2ActionMap.get(player2Action);
  // console.log(player2ActionName);
  var player1ActionWins = actionToActionMap.get(player1ActionName);
  // console.log(player1ActionWins);

  if (player1ActionWins == player2ActionName) {
    // console.log("Player 1 wins");
    totalScore += scoreMap.get(player2ActionName);
  } else if (player1ActionName == player2ActionName) {
    // console.log("Draw");
    totalScore += 3 + scoreMap.get(player2ActionName);
  } else {
    // console.log("Player 2 wins");
    totalScore += 6 + scoreMap.get(player2ActionName);
  }
}

console.log(`Total score: ${totalScore}`);
