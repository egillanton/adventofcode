import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

// Part One
// Rock paper scissors map
var winActionMap = new Map();
winActionMap.set("Rock", "Scissors"); // Rock beats scissors
winActionMap.set("Paper", "Rock"); // Paper beats rock
winActionMap.set("Scissors", "Paper"); // Scissors beats paper

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
  var player1ActionWins = winActionMap.get(player1ActionName);
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

// Part two
totalScore = 0;
var howTheRoundShouldEndMap = new Map();
howTheRoundShouldEndMap.set("X", 0); // Play one needs to win
howTheRoundShouldEndMap.set("Y", 3); // Players need to draw
howTheRoundShouldEndMap.set("Z", 6); // Player two needs to win 

var losingActionMap = new Map();
losingActionMap.set("Rock", "Paper"); // Rock looses against scissors
losingActionMap.set("Paper", "Scissors"); // Paper looses against rock
losingActionMap.set("Scissors", "Rock"); // Scissors looses against paper

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var [player1Action, howTheRoundShouldEnd] = line.split(" ").map((x) => x.trim());

  var player1ActionName = player1ActionMap.get(player1Action);
  if(howTheRoundShouldEnd == "X"){
    // Player 1 needs to win
    var losingActionName = winActionMap.get(player1ActionName);
    totalScore += scoreMap.get(losingActionName);
  } else if(howTheRoundShouldEnd == "Y"){
    // Players need to draw
    totalScore += 3 + scoreMap.get(player1ActionName);
  }
  else {
    // Player 2 needs to win
    var winningActionName = losingActionMap.get(player1ActionName);
    totalScore += 6 + scoreMap.get(winningActionName);
  }
}

console.log(`Total score: ${totalScore}`);