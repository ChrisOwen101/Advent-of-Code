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

  const clean = data
    .split("\n")
    .map((pairData) => {
      return pairData.split(",");
    })
    .filter((pair) => {
      const elfLeft = pair[0].split("-");
      const elfRight = pair[1].split("-");

      if (
        (parseInt(elfLeft[0]) <= parseInt(elfRight[0]) &&
          parseInt(elfLeft[1]) >= parseInt(elfRight[1])) ||
        (parseInt(elfRight[0]) <= parseInt(elfLeft[0]) &&
          parseInt(elfRight[1]) >= parseInt(elfLeft[1]))
      ) {
        return true;
      } else {
        return false;
      }
    });

  console.log(clean.length);
});

// Challenge 2
readElfGatheringData((data) => {
  console.log("### CHALLENGE 2 ###");

  const clean = data
    .split("\n")
    .map((pairData) => {
      return pairData.split(",");
    })
    .filter((pair) => {
      const elfLeft = pair[0].split("-").reduce(createArray);
      const elfRight = pair[1].split("-").reduce(createArray);
      const found = elfLeft.some((r) => elfRight.indexOf(r) >= 0);
      return found;
    });

  console.log(clean.length);
});

function createArray(acc, cur) {
  const nums = [];
  for (let i = parseInt(acc); i <= parseInt(cur); i++) {
    nums.push(i);
  }
  return nums;
}
