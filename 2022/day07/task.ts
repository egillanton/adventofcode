// Day 7: No Space Left On Device
import { Console } from "console";
import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

type Directory = {
  name: string;
  path: string;
  size: number;
  parent: Directory | null;
  children: Directory[];
  files: File[];
};

type File = {
  parent: Directory;
  path: string,
  name: string;
  size: number;
};

var commandSections = input.split("$").map((x) => x.trim());
var maxDirSize = 100000;
var sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSize = 0;

var root: Directory = {
  name: "/",
  path: "/",
  size: 0,
  parent: null,
  children: [],
  files: [],
};

var currentDirectory: Directory = root;

var updateDirectorySize = (directory: Directory, amount: number) => {
  directory.size += amount;
  if (directory.parent) {
    updateDirectorySize(directory.parent, amount);
  }
};

var addFileToDirectory = (directory: Directory, file: File) => {
  directory.files.push(file);
  directory.size += file.size;
  if (directory.parent) {
    updateDirectorySize(directory.parent, file.size);
  }
};

var addDirectoryToDirectory = (directory: Directory, parent: Directory) => {
  parent.children.push(directory);
  parent.size += directory.size;
  if (parent.parent) {
    updateDirectorySize(parent.parent, directory.size);
  }
};

// Build the directory tree
for (var i = 0; i < commandSections.length; i++) {
  var commandSection = commandSections[i];

  var commandParts = commandSection.split("\n").map((x) => x.trim());
  var commandLine = commandParts[0];
  var command = commandLine.split(" ")[0];
  var output = commandParts.splice(1);

  if (command == "cd") {
    var argument = commandLine.split(" ")[1]; 
    if (argument == "..") {
      if(currentDirectory == root) {
        console.log("Cannot go up from root");
      } else {
        currentDirectory = currentDirectory.parent as Directory;
      }
    }  else if (argument == root.path){
      currentDirectory = root;
    }
    else if (argument) {
      var dir = currentDirectory.children.find((x) => x.name == argument);
      if (dir) {
        currentDirectory = dir;
      } else {
        console.log("Cannot find directory: " + argument);
      }
    }
  }     

  if (command == "ls") {
    var dirSize = 0;
    for (var j = 0; j < output.length; j++) {
      var [firstPart, secondPart] = output[j].split(" ").map((x) => x.trim());
      // console.log(firstPart, secondPart);
      if (firstPart == "dir") {
        var newDir: Directory = {
          name: secondPart,
          path: `${currentDirectory?.path}${secondPart}/`,
          size: 0,
          parent: currentDirectory,
          children: [],
          files: [],
        };
        addDirectoryToDirectory(newDir, currentDirectory);
      } else if (parseInt(firstPart)) {
        var fileSize = parseInt(firstPart);
        var fileName = secondPart;
        var newFile: File = {
          parent: currentDirectory,
          path: `${currentDirectory?.path}${fileName}`,
          name: fileName,
          size: fileSize,
        };
        addFileToDirectory(currentDirectory, newFile);
      } else {
        console.log("Unknown firstPart: " + firstPart);
      }
    }
  }
}

// Print the directory tree
var printDirectoryRec = (directory: Directory, indent: string) => {
  console.log(`${indent}${directory.name} (${directory.size})`);
  for (var i = 0; i < directory.children.length; i++) {
    printDirectoryRec(directory.children[i], indent + "  ");
  }
  for (var i = 0; i < directory.files.length; i++) {
    console.log(`${indent} ${directory.files[i].name} (${directory.files[i].size})`);
  }
};
printDirectoryRec(root, "");

// Sum of the total sizes of directories at most 100000
var sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSize = 0;
var sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSizeRec = (directory: Directory) => {
  if (directory.size <= maxDirSize) {
    sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSize += directory.size;
  }
  for (var i = 0; i < directory.children.length; i++) {
    sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSizeRec(directory.children[i]);
  }
};
sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSizeRec(root);

console.log("========================================");
console.log(`Sum of the total sizes of directories at most ${maxDirSize}: ${sumOfTheTotalSizesOfDirectoriesAtMostMaxDirSize}`);

// Part two
var totalDiskSpace = 70000000; 
var requiredFreeSpace = 30000000;
var bytesToDelete = root.size - (totalDiskSpace - requiredFreeSpace);

console.log("Used space: " + root.size); 
console.log(`Total disk space: ${totalDiskSpace} bytes`);
console.log(`Current occupied space: ${root.size} bytes`);
console.log(`Free space: ${totalDiskSpace - root.size} bytes`);
console.log(`Required free space: ${requiredFreeSpace} bytes`);
console.log(`We need to delete ${bytesToDelete} bytes`)

var directoryToBeDeleted: Directory | undefined;

// Find the smallest directory to delete that is larger than bytesToDelete
var findSmallestDirectoryToBeDeletedRec = (directory: Directory) => {
  if (directory.size > bytesToDelete) {
    if (!directoryToBeDeleted || directory.size < directoryToBeDeleted.size) {
      directoryToBeDeleted = directory;
    }
  }
  for (var i = 0; i < directory.children.length; i++) {
    findSmallestDirectoryToBeDeletedRec(directory.children[i]);
  }
};
findSmallestDirectoryToBeDeletedRec(root);

console.log("Smallest directory to delete: " + directoryToBeDeleted?.path);
console.log("Size of smallest directory to delete: " + directoryToBeDeleted?.size);

