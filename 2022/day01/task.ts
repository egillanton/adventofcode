// Day 8: Treetop Tree House
import * as fs from "fs";
import * as path from "path";

class Elf {
  food: number[];

  constructor() {
    this.food = [];
  }

  addFood = (food: number) => {
    this.food.push(food);
  };

  totalFoodCalories = () => {
    return this.food.reduce((a, b) => a + b);
  };
}

var CountCalories = (lines: string[]) => {
  var elves = [] as Elf[];

  var elf = new Elf();
  for (var i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      elves.push(elf);
      elf = new Elf();
    } else {
      elf.addFood(parseInt(lines[i]));
    }
  }

  console.log(elves.length);
  console.log(elves.map((elf) => elf.totalFoodCalories()));
  // console.log the sum of all the elves totalFoodCalories

  // print the elves with the highest totalFoodCalories and its index in the array
  var max = 0;
  var maxIndex = 0;
  for (var i = 0; i < elves.length; i++) {
    if (elves[i].totalFoodCalories() > max) {
      max = elves[i].totalFoodCalories();
      maxIndex = i;
    }
  }
  // Part A
  console.log(maxIndex);
  console.log(max);

  // Part B
  // console.log the sum of the first tree elves totalFoodCalories
  var elvesSortedByTotalFoodCalories = elves.sort(
    (a, b) => b.totalFoodCalories() - a.totalFoodCalories()
  );
  return (
    elvesSortedByTotalFoodCalories[0].totalFoodCalories() +
    elvesSortedByTotalFoodCalories[1].totalFoodCalories() +
    elvesSortedByTotalFoodCalories[2].totalFoodCalories()
  );
};

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
var lines = input.split("\n");

var calories = CountCalories(lines);
// Calories: 195625
console.log(`Calories: ${calories}`);
