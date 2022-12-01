const { get } = require("http");

fs = require("fs");

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

  const maxCarry = getElfTotals(data).reduce(
    (currentMax, current) => Math.max(currentMax, current),
    0
  );

  console.log("Max Carry " + maxCarry);
});

// Challenge 2
readElfGatheringData((data) => {
  console.log("### CHALLENGE 2 ###");

  const elfAmounts = getElfTotals(data).sort().reverse();
  const maxCarry = elfAmounts[2] + elfAmounts[3] + elfAmounts[4];

  console.log("Max Carry " + maxCarry);
});

function getElfTotals(data) {
  return data.split(`\n\n`).map((elfCarry) => {
    return elfCarry.split(`\n`).reduce((a, b) => a + parseInt(b), 0);
  });
}
