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
  console.log("### CHALLENGE 1 ###");

  let leftPointer = 0;
  let rightPointer = 14;
  let result;

  for (let i = 0; i < data.length; i++) {
    const sliced = data.slice(leftPointer, rightPointer);
    if (lettersAllDifferent(sliced)) {
      result = rightPointer;
      break;
    }

    leftPointer++;
    rightPointer++;
  }

  console.log(result);
});

function lettersAllDifferent(letters) {
  const check = {};
  for (let i = 0; i < letters.length; i++) {
    check[letters[i]] = true;
  }

  return Object.keys(check).length === letters.length;
}
