const fs = require("fs");

function readElfGatheringData(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    callback(data);
  });
}

function generateForest(inputForest) {
  const forest = inputForest.split("\n").map((row) => {
    return row.split("").map((treeHeight) => {
      return new Tree(parseInt(treeHeight));
    });
  });

  return forest;
}

function calculateTrees(inputForest) {
  const forest = generateForest(inputForest);

  let visibleCount = 0;

  forest.forEach((forestRow, x) => {
    forestRow.forEach((tree, y) => {
      if (
        x === 0 ||
        x === forest.length - 1 ||
        y === 0 ||
        y === forestRow.length - 1
      ) {
        visibleCount++;
        tree.visible = true;
        return;
      }

      if (!tree.visible) {
        if (checkVisible(x, y, forest)) {
          visibleCount++;
          tree.visible = true;
          return;
        }
      }
    });
  });

  console.log(forest);

  return visibleCount;
}

function checkVisible(x, y, forest) {
  let visible = true;

  //Check up
  for (let i = x; i >= 0; i--) {
    if (i === x && y === y) {
      continue;
    }

    if (forest[i][y].height >= forest[x][y].height) {
      visible = false;
    }
  }

  if (visible) {
    return true;
  }

  visible = true;

  //Check Down
  for (let i = x; i < forest.length; i++) {
    if (i === x && y === y) {
      continue;
    }

    if (forest[i][y].height >= forest[x][y].height) {
      visible = false;
    }
  }

  if (visible) {
    return true;
  }

  visible = true;

  //Check right
  for (let i = y; i < forest[x].length; i++) {
    if (x === x && i === y) {
      continue;
    }

    if (forest[x][i].height >= forest[x][y].height) {
      visible = false;
    }
  }

  if (visible) {
    return true;
  }

  visible = true;

  //Check left
  for (let i = y; i >= 0; i--) {
    if (x === x && i === y) {
      continue;
    }

    if (forest[x][i].height >= forest[x][y].height) {
      visible = false;
    }
  }

  return visible;
}

class Tree {
  visible = false;
  scenic = -1;

  constructor(height) {
    this.height = height;
  }
}

function calculateScenicScore(forest, x, y) {
  //Check Up
  let upCount = 0;

  for (let i = x; i >= 0; i--) {
    if (i === x && y === y) {
      continue;
    }

    const inspectTree = forest[i][y];
    const currentTree = forest[x][y];
    upCount++;

    if (inspectTree.height >= currentTree.height) {
      break;
    }
  }

  let downCount = 0;

  for (let i = x; i < forest.length; i++) {
    if (i === x && y === y) {
      continue;
    }

    const inspectTree = forest[i][y];
    const currentTree = forest[x][y];
    downCount++;

    if (inspectTree.height >= currentTree.height) {
      break;
    }
  }

  let rightCount = 0;
  for (let i = y; i < forest[x].length; i++) {
    if (x === x && i === y) {
      continue;
    }

    const inspectTree = forest[x][i];
    const currentTree = forest[x][y];
    rightCount++;

    if (inspectTree.height >= currentTree.height) {
      break;
    }
  }

  let leftCount = 0;
  for (let i = y; i >= 0; i--) {
    if (x === x && i === y) {
      continue;
    }

    const inspectTree = forest[x][i];
    const currentTree = forest[x][y];
    leftCount++;

    if (inspectTree.height >= currentTree.height) {
      break;
    }
  }

  return upCount * downCount * leftCount * rightCount;
}

function calculateMaxScenicScore(inputForest) {
  const forest = generateForest(inputForest);

  let max = 0;

  forest.forEach((forestRow, x) => {
    forestRow.forEach((tree, y) => {
      const score = calculateScenicScore(forest, x, y);
      tree.scenic = score;

      if (tree.scenic > max) {
        max = tree.scenic;
      }
    });
  });

  console.log(forest);

  return max;
}

//Should print 1
readElfGatheringData("simple.txt", (data) => {
  //console.log(calculateTrees(data));
  //console.log(calculateMaxScenicScore(data));
});

//Should print 8
readElfGatheringData("test.txt", (data) => {
  //console.log(calculateTrees(data));
  //console.log(calculateMaxScenicScore(data));
});

//Be our solution
readElfGatheringData("trees.txt", (data) => {
  //console.log(calculateTrees(data));
  console.log(calculateMaxScenicScore(data));
});
