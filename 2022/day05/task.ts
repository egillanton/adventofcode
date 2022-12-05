import * as fs from "fs";
import * as path from "path";

const input1 = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const input2 = fs.readFileSync(path.join(__dirname, "input2.txt"), "utf8");

// Day 5: Supply Stacks
var stackInputLines = input2.split("\n");

var [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9] =
  stackInputLines.map((line) => line.split(",").map((x) => x.trim()));

var stackMap = new Map<string, string[]>();
stackMap.set("1", stack1);
stackMap.set("2", stack2);
stackMap.set("3", stack3);
stackMap.set("4", stack4);
stackMap.set("5", stack5);
stackMap.set("6", stack6);
stackMap.set("7", stack7);
stackMap.set("8", stack8);
stackMap.set("9", stack9);

var lines = input1.split("\n");
for (var i = 10; i < lines.length; i++) {
  var line = lines[i];
  if (!line) continue;

  // Parse the moves
  var tokens = line.split(" ").map((x) => x.trim());
  var count = parseInt(tokens[1]);
  // console.log(count);
  var stackNumber1 = tokens[3];
  // console.log(stackNumber1);
  var stackNumber2 = tokens[5];
  // console.log(stackNumber2);

  var tempStack: string[] = [];
  for (var j = 0; j < count; j++) {
    var item = stackMap.get(stackNumber1)?.pop();
    tempStack.push(item as string);
  }

  for (var j = 0; j < count; j++) {
    var item = tempStack?.pop();
    stackMap.get(stackNumber2)?.push(item as string);
  }
}

var output = "";
for (var i = 1; i <= 9; i++) {
  var s = i.toString();
  output += stackMap.get(s)?.pop();
}

console.log(output);
