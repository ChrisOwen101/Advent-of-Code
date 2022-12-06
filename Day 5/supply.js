const fs = require("fs");

function readElfGatheringData(callback) {
  fs.readFile("elf.txt", "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    callback(data);
  });
}

// Challenge 1
readElfGatheringData((data) => {
  console.log("### CHALLENGE 2 ###");

  const rows = [[], [], [], [], [], [], [], [], []];

  const split = data.split("\n\n");
  const diagram = split[0];
  const instructions = split[1].split("\n");

  diagram.split("\n").forEach((row) => {
    let columnCount = 0;
    for (let i = 0; i < row.length; i += 4) {
      const entry = row.slice(i, i + 4);
      const letter = entry[1];
      if (letter !== " " && !isNumber(letter)) {
        rows[columnCount].push(entry[1]);
      }

      columnCount++;
    }
  });

  instructions.forEach((line) => {
    const [count, from, to] = extractNumbersFromString(line);
    const assignment = [];
    for (let i = 0; i < count; i++) {
      assignment.push(rows[from - 1].shift());
    }
    rows[to - 1].unshift(...assignment);
  });

  const result = [];
  rows.forEach((column) => {
    result.push(column[0]);
  });

  console.log(result.join(""));
});

function extractNumbersFromString(line) {
  return line.match(/\d+/g);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
