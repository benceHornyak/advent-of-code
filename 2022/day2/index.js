const fs = require("fs");

const codeMatrixPart1 = {
  A: "Rock",
  X: "Rock",

  B: "Paper",
  Y: "Paper",

  C: "Scissors",
  Z: "Scissors",
};

const codeMatrixPart2 = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const shapePointMatrix = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const winMatrix = {
  Paper: "Rock",
  Rock: "Scissors",
  Scissors: "Paper",
};

const loseMatrix = {
  Paper: "Scissors",
  Rock: "Paper",
  Scissors: "Rock",
};

const solver = ({ opponent, own }) => {
  const shapePoint = shapePointMatrix[own];
  const draw = own === opponent;
  const isWin = winMatrix[own] === opponent;
  const winPoint = draw ? 3 : !isWin ? 0 : 6;
  return winPoint + shapePoint;
};

const solverPart2 = ({ opponent, own }) => {
  // own: 'lose', 'draw', 'win'
  let ownShape;
  if (own === "lose") {
    ownShape = winMatrix[opponent];
  } else if (own === "win") {
    ownShape = loseMatrix[opponent];
  } else if (own === "draw") {
    ownShape = opponent;
  }

  const shapePoint = shapePointMatrix[ownShape];
  const draw = ownShape === opponent;
  const isWin = winMatrix[ownShape] === opponent;
  const winPoint = draw ? 3 : !isWin ? 0 : 6;
  return winPoint + shapePoint;
};

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    // part1
    const solutionPart1 = data
      .split("\n")
      .map((row) => row.split(" "))
      .map(([opponent, own]) =>
        solver({
          opponent: codeMatrixPart1[opponent],
          own: codeMatrixPart1[own],
        })
      )
      .reduce((a, b) => a + b, 0);
    console.log(solutionPart1);

    const solutionPart2 = data
      .split("\n")
      .map((row) => row.split(" "))
      .map(([opponent, own]) =>
        solverPart2({
          opponent: codeMatrixPart1[opponent],
          own: codeMatrixPart2[own],
        })
      )
      .reduce((a, b) => a + b, 0);
    console.log(solutionPart2);
  });
};

main();
solverPart2({
  opponent: 'Paper',
  own: 'lose',
});
