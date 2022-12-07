const fs = require("fs");

function readElfGatheringData(callback) {
  fs.readFile("elf.txt", "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    callback(data);
  });
}

const COMMAND = "$";
const DIRECTORY = "d";
const LS = "ls";
const CD = "cd";
const UP = "..";

// Challenge 1
readElfGatheringData((data) => {
  const lines = data.split("\n");
  let root = new Directory("/", undefined);
  let currentDirectory = root;

  for (let line of lines) {
    console.log(line);
    if (isCommand(line)) {
      const command = line.split(" ")[1];

      if (command.includes(LS)) {
        continue;
      }

      const commandDir = line.split(" ")[2];

      if (command.includes(CD)) {
        if (commandDir.includes(UP)) {
          if (currentDirectory.name === "/") {
            continue;
          }
          currentDirectory = currentDirectory.parent;
          console.log("Move Up Dir to: " + currentDirectory.name);
        } else {
          currentDirectory = currentDirectory.children.find((dir) => {
            return dir.name === commandDir;
          });
          console.log("Move Dir to: " + currentDirectory.name);
        }
      }
    } else if (isDirectory(line)) {
      const name = line.replace("dir ", "");
      const dir = new Directory(name, currentDirectory);
      currentDirectory.addChild(dir);
      console.log("Added Dir: " + name);
    } else {
      const split = line.split(" ");
      const size = parseInt(split[0]);
      const name = split[1];
      const file = new File(name, currentDirectory, size);
      currentDirectory.addChild(file);
      console.log("Added File: " + name);
    }
  }
  calcSizes(root);
  const spaceNeeded = 30000000 - (70000000 - root.size);
  console.log("Space:" + spaceNeeded);

  const size = getDeletableDirectory(root, spaceNeeded);
  console.log(size);
});

function getDeletableDirectory(directory, amount) {
  let dirs = [];
  for (let child of directory.children) {
    if (child instanceof Directory) {
      if (child.size >= amount) {
        dirs.push(child);
      }

      dirs = dirs.concat(getDeletableDirectory(child, amount));
    }
  }

  return dirs;
}

//95437
function getSizes(directory) {
  let dirs = [];
  for (let child of directory.children) {
    if (child instanceof Directory) {
      if (child.size < 100000) {
        dirs.push(child);
      }

      dirs = dirs.concat(getSizes(child));
    }
  }

  return dirs;
}

function calcSizes(directory) {
  let dirs = [];
  for (let child of directory.children) {
    if (child instanceof Directory) {
      calcSizes(child);
    }

    directory.size += child.size;
  }

  return dirs;
}

function isCommand(line) {
  return line[0] === COMMAND;
}

function isDirectory(line) {
  return line[0] === DIRECTORY;
}

class Directory {
  children = [];
  size = 0;

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }

  addChild(child) {
    this.children.push(child);
  }
}

class File {
  constructor(name, parent, size) {
    this.name = name;
    this.parent = parent;
    this.size = size;
  }
}
