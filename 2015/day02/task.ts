import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
var lines = input.split("\n");

// Part One
var totalPaper = 0;
for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var [x, y, z] = line.split("x").map((x) => parseInt(x));
  var smallestSide = Math.min(x * y, y * z, z * x);
  // console.log(`smallestSide: ${smallestSide} square feet of wrapping paper`);
  var presentSurfaceSize = 2 * x * y + 2 * y * z + 2 * z * x;
  // console.log(`presentSurfaceSize: ${presentSurfaceSize} square feet of wrapping paper`);
  var totalWrappingPaperSize = presentSurfaceSize + smallestSide;
  // console.log(`totalWrappingPaperSize: ${totalWrappingPaperSize} square feet of wrapping paper`);
  totalPaper += totalWrappingPaperSize;
}

console.log(`totalPaper: ${totalPaper} square feet of wrapping paper`);