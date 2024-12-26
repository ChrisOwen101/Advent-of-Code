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

  const bags = data
    .split("\n")
    .map((bag) => {
      const compLength = bag.length / 2;
      const left = bag.slice(0, compLength);
      const right = bag.slice(compLength);

      return findSharedItems(left, right);
    })
    .reduce((acc, sharedItems) => {
      return (
        acc +
        sharedItems.reduce((acc, item) => {
          return acc + convertLetterToNumber(item);
        }, 0)
      );
    }, 0);

  console.log(bags);
});

// Challenge 2
readElfGatheringData((data) => {
  console.log("### CHALLENGE 2 ###");

  const bags = data.split("\n");
  const groupBags = [[]];

  let groupNumber = 0;

  for (let i = 0; i < bags.length; i++) {
    if (i != 0 && i % 3 === 0) {
      groupNumber++;
      groupBags[groupNumber] = [];
    }

    groupBags[groupNumber].push(bags[i]);
  }

  const score = groupBags
    .map((sharedBag) => {
      const sharedItems = findSharedItems(sharedBag[0], sharedBag[1]).join("");
      const finalSharedItem = findSharedItems(sharedItems, sharedBag[2]);
      return finalSharedItem[0];
    })
    .reduce((acc, cur) => {
      return acc + convertLetterToNumber(cur);
    }, 0);

  console.log(score);
});

function findSharedItems(input1, input2) {
  const sharedItems = [];
  let left, right;

  if (input1.length > input2.length) {
    left = input1;
    right = input2;
  } else {
    left = input2;
    right = input1;
  }

  left.split("").forEach((item) => {
    if (right.includes(item) && !sharedItems.includes(item)) {
      sharedItems.push(item);
    }
  });

  return sharedItems;
}

//This is really inefficient
function convertLetterToNumber(letter) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letter) {
      return i + 1;
    }
  }
}
