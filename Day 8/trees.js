const fs = require("fs");

function readElfGatheringData(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    callback(data);
  });
}

function calculateTrees(inputForest) {
  const forest = inputForest.split("\n").map((row) => {
    return row.split("").map((treeHeight) => {
      return new Tree(parseInt(treeHeight));
    });
  });

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

  constructor(height) {
    this.height = height;
  }
}

//Should print 9
readElfGatheringData("simple.txt", (data) => {
  //console.log(calculateTrees(data));
});

//Should print 21
readElfGatheringData("test.txt", (data) => {
  //console.log(calculateTrees(data));
});

//Be our solution
readElfGatheringData("trees.txt", (data) => {
  console.log(calculateTrees(data));
});
