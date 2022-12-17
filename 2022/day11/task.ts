// Day 11: Monkey in the Middle
import * as fs from "fs";
import * as path from "path";

// const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

type Item = {
  Id: number;
  WorryLevel: number;
};

// Part 1: What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?
type Monkey = {
  Id: number;
  Items: Item[];
  Operation: {
    Symbol: string;
    Delta?: number;
  };
  Test: {
    Symbol: string;
    Delta: number;
  };
  TrueMonkey: number;
  FalseMonkey: number;
  InspectedItemsCount: number;
};

var TestMonkeys: Monkey[] = [
  {
    Id: 0,
    Items: [
      { Id: 0, WorryLevel: 79 },
      { Id: 1, WorryLevel: 98 },
    ],
    Operation: {
      Symbol: "*",
      Delta: 19,
    },
    Test: {
      Symbol: "/",
      Delta: 23,
    },
    TrueMonkey: 2,
    FalseMonkey: 3,
    InspectedItemsCount: 0,
  },
  {
    Id: 1,
    Items: [
      { Id: 2, WorryLevel: 54 },
      { Id: 3, WorryLevel: 65 },
      { Id: 4, WorryLevel: 75 },
      { Id: 5, WorryLevel: 74 },
    ],
    Operation: {
      Symbol: "+",
      Delta: 6,
    },
    Test: {
      Symbol: "/",
      Delta: 19,
    },
    TrueMonkey: 2,
    FalseMonkey: 0,
    InspectedItemsCount: 0,
  },
  {
    Id: 2,
    Items: [
      { Id: 6, WorryLevel: 79 },
      { Id: 7, WorryLevel: 60 },
      { Id: 8, WorryLevel: 97 },
    ],
    Operation: {
      Symbol: "**",
    },
    Test: {
      Symbol: "/",
      Delta: 13,
    },
    TrueMonkey: 1,
    FalseMonkey: 3,
    InspectedItemsCount: 0,
  },
  {
    Id: 3,
    Items: [{ Id: 9, WorryLevel: 74 }],
    Operation: {
      Symbol: "+",
      Delta: 3,
    },
    Test: {
      Symbol: "/",
      Delta: 17,
    },
    TrueMonkey: 0,
    FalseMonkey: 1,
    InspectedItemsCount: 0,
  },
];

var InputMonkeys: Monkey[] = [
  {
    Id: 0,
    Items: [
      { Id: 0, WorryLevel: 71 },
      { Id: 1, WorryLevel: 86 },
    ],
    Operation: {
      Symbol: "*",
      Delta: 13,
    },
    Test: {
      Symbol: "/",
      Delta: 19,
    },
    TrueMonkey: 6,
    FalseMonkey: 7,
    InspectedItemsCount: 0,
  },
  {
    Id: 1,
    Items: [
      { Id: 2, WorryLevel: 66 },
      { Id: 3, WorryLevel: 50 },
      { Id: 4, WorryLevel: 90 },
      { Id: 5, WorryLevel: 53 },
      { Id: 6, WorryLevel: 88 },
      { Id: 7, WorryLevel: 85 },
    ],
    Operation: {
      Symbol: "+",
      Delta: 3,
    },
    Test: {
      Symbol: "/",
      Delta: 2,
    },
    TrueMonkey: 5,
    FalseMonkey: 4,
    InspectedItemsCount: 0,
  },
  {
    Id: 2,
    Items: [
      { Id: 8, WorryLevel: 97 },
      { Id: 9, WorryLevel: 54 },
      { Id: 10, WorryLevel: 89 },
      { Id: 11, WorryLevel: 62 },
      { Id: 12, WorryLevel: 84 },
      { Id: 13, WorryLevel: 80 },
      { Id: 14, WorryLevel: 63 },
    ],
    Operation: {
      Symbol: "+",
      Delta: 6,
    },
    Test: {
      Symbol: "/",
      Delta: 13,
    },
    TrueMonkey: 4,
    FalseMonkey: 1,
    InspectedItemsCount: 0,
  },
  {
    Id: 3,
    Items: [
      { Id: 15, WorryLevel: 82 },
      { Id: 16, WorryLevel: 97 },
      { Id: 17, WorryLevel: 56 },
      { Id: 18, WorryLevel: 92 },
    ],
    Operation: {
      Symbol: "+",
      Delta: 2,
    },
    Test: {
      Symbol: "/",
      Delta: 5,
    },
    TrueMonkey: 6,
    FalseMonkey: 0,
    InspectedItemsCount: 0,
  },
  {
    Id: 4,
    Items: [
      { Id: 20, WorryLevel: 50 },
      { Id: 21, WorryLevel: 99 },
      { Id: 22, WorryLevel: 67 },
      { Id: 23, WorryLevel: 61 },
      { Id: 24, WorryLevel: 86 },
    ],
    Operation: {
      Symbol: "**",
    },
    Test: {
      Symbol: "/",
      Delta: 7,
    },
    TrueMonkey: 5,
    FalseMonkey: 3,
    InspectedItemsCount: 0,
  },
  {
    Id: 5,
    Items: [
      { Id: 25, WorryLevel: 61 },
      { Id: 26, WorryLevel: 66 },
      { Id: 27, WorryLevel: 72 },
      { Id: 28, WorryLevel: 55 },
      { Id: 29, WorryLevel: 64 },
      { Id: 30, WorryLevel: 53 },
      { Id: 31, WorryLevel: 72 },
      { Id: 32, WorryLevel: 63 },
    ],
    Operation: {
      Symbol: "+",
      Delta: 4,
    },
    Test: {
      Symbol: "/",
      Delta: 11,
    },
    TrueMonkey: 3,
    FalseMonkey: 0,
    InspectedItemsCount: 0,
  },
  {
    Id: 6,
    Items: [
      { Id: 33, WorryLevel: 59 },
      { Id: 34, WorryLevel: 79 },
      { Id: 35, WorryLevel: 63 },
    ],
    Operation: {
      Symbol: "*",
      Delta: 7,
    },
    Test: {
      Symbol: "/",
      Delta: 17,
    },
    TrueMonkey: 2,
    FalseMonkey: 7,
    InspectedItemsCount: 0,
  },
  {
    Id: 7,
    Items: [{ Id: 36, WorryLevel: 55 }],
    Operation: {
      Symbol: "+",
      Delta: 7,
    },
    Test: {
      Symbol: "/",
      Delta: 3,
    },
    TrueMonkey: 2,
    FalseMonkey: 1,
    InspectedItemsCount: 0,
  },
];

var Monkeys = InputMonkeys;

var roundsFinished = 0;
while (roundsFinished < 20) {
  for (let i = 0; i < Monkeys.length; i++) {
    var Monkey = Monkeys[i];
    console.log(`Monkey ${Monkey.Id}:`);
    while (Monkey.Items.length > 0) {
      // Check worry level
      var itemToBeInspected = Monkey.Items.shift();
      Monkey.InspectedItemsCount++;
      console.log(
        `  Monkey inspects an item with a worry level of ${itemToBeInspected.WorryLevel}.`
      );
      // Do a operation
      var worryLevelAfterInspection: number;
      if (Monkey.Operation.Symbol == "+") {
        worryLevelAfterInspection =
          itemToBeInspected.WorryLevel + Monkey.Operation.Delta;
        console.log(
          `    Worry level increases by ${Monkey.Operation.Delta} to ${worryLevelAfterInspection}.`
        );
      } else if (Monkey.Operation.Symbol == "*") {
        worryLevelAfterInspection =
          itemToBeInspected.WorryLevel * Monkey.Operation.Delta;
        console.log(
          `    Worry level is multiplied by ${Monkey.Operation.Delta} to ${worryLevelAfterInspection}.`
        );
      } else if (Monkey.Operation.Symbol == "**") {
        worryLevelAfterInspection =
          itemToBeInspected.WorryLevel * itemToBeInspected.WorryLevel;
        console.log(
          `    Worry level is multiplied by itself to ${worryLevelAfterInspection}.`
        );
      }

      var worryLevelAfterMonkeyGetsBored = Math.floor(
        worryLevelAfterInspection / 3
      );
      console.log(
        `    Monkey gets bored with item. Worry level is divided by 3 to ${worryLevelAfterMonkeyGetsBored}.`
      );

      var monkeyToThrowItemTo: Monkey;
      if (worryLevelAfterMonkeyGetsBored % Monkey.Test.Delta == 0) {
        console.log(
          `    Current worry level is divisible by ${Monkey.Test.Delta}.`
        );
        monkeyToThrowItemTo = Monkeys[Monkey.TrueMonkey];
      } else {
        console.log(
          `    Current worry level is not divisible by ${Monkey.Test.Delta}.`
        );
        monkeyToThrowItemTo = Monkeys[Monkey.FalseMonkey];
      }

      console.log(
        `    Item with worry level ${worryLevelAfterMonkeyGetsBored} is thrown to monkey ${monkeyToThrowItemTo.Id}.`
      );
      itemToBeInspected.WorryLevel = worryLevelAfterMonkeyGetsBored;
      // Throw Items to next monkey one item at a time
      monkeyToThrowItemTo.Items.push(itemToBeInspected);
    }
  }
  roundsFinished++;
}

for (let i = 0; i < Monkeys.length; i++) {
  console.log(
    `Monkey ${Monkeys[i].Id} inspected items ${Monkeys[i].InspectedItemsCount}.`
  );
}

var sortedList = Monkeys.sort(
  (a, b) => b.InspectedItemsCount - a.InspectedItemsCount
);

var topMonkey1 = sortedList[0];
var topMonkey2 = sortedList[1];
var monkeyBusinessLevel =
  topMonkey1.InspectedItemsCount * topMonkey2.InspectedItemsCount;

console.log(
  "What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?"
);
console.log(`Answer: ${monkeyBusinessLevel}`); // Answer: 88208
