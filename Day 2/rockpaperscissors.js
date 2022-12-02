const fs = require("fs");

const opponentRock = "A";
const opponentPaper = "B";
const opponentScissors = "C";

const playerRock = "X";
const playerPaper = "Y";
const playerScissors = "Z";

const lose = "X";
const draw = "Y";
const win = "Z";

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

  let totalScore = data.split("\n").reduce((acc, game) => {
    const split = game.split(" ");
    const opponent = split[0];
    const player = split[1];
    return (acc += getScore(opponent, player));
  }, 0);
  console.log(totalScore);
});

function getScore(opponent, player) {
  let total = 0;

  if (player === playerRock) {
    total += 1;
  } else if (player === playerPaper) {
    total += 2;
  } else if (player === playerScissors) {
    total += 3;
  }

  if (
    (player === playerRock && opponent === opponentPaper) ||
    (player === playerPaper && opponent === opponentScissors) ||
    (player === playerScissors && opponent === opponentRock)
  ) {
    return total;
  }

  if (
    (player === playerRock && opponent === opponentRock) ||
    (player === playerPaper && opponent === opponentPaper) ||
    (player === playerScissors && opponent === opponentScissors)
  ) {
    return total + 3;
  }

  if (
    (player === playerPaper && opponent === opponentRock) ||
    (player === playerScissors && opponent === opponentPaper) ||
    (player === playerRock && opponent === opponentScissors)
  ) {
    return total + 6;
  }

  return total;
}

// Challenge 2
readElfGatheringData((data) => {
  console.log("### CHALLENGE 2 ###");

  let totalScore = data.split("\n").reduce((acc, game) => {
    const split = game.split(" ");
    const opponent = split[0];
    const outcome = split[1];
    const player = getChoice(opponent, outcome);
    return (acc += getScore(opponent, player));
  }, 0);
  console.log(totalScore);
});

function getChoice(opponent, outcome) {
  if (
    (opponent === opponentPaper && outcome === lose) ||
    (opponent === opponentRock && outcome === draw) ||
    (opponent === opponentScissors && outcome === win)
  ) {
    return playerRock;
  }

  if (
    (opponent === opponentScissors && outcome === lose) ||
    (opponent === opponentPaper && outcome === draw) ||
    (opponent === opponentRock && outcome === win)
  ) {
    return playerPaper;
  }

  if (
    (opponent === opponentPaper && outcome === win) ||
    (opponent === opponentRock && outcome === lose) ||
    (opponent === opponentScissors && outcome === draw)
  ) {
    return playerScissors;
  }
}
