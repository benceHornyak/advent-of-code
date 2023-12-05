const fs = require("fs");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const readData = data.split("\n");

    // Part1
    const sumOfPoints = readData
      .map((row) => {
        const [winningNumbers, myNumbers] = row
          .split(": ")[1]
          .split(" | ")
          .map((r) =>
            r
              .trim()
              .split(" ")
              .filter((s) => s !== "")
          );

        const myWinningNumbers = winningNumbers
          .filter((numbserString) => myNumbers.includes(numbserString))
          .reduce(
            (acc, curr, index, arr) =>
              Math.pow(2, arr.length === 0 ? 0 : arr.length - 1),
            0
          );

        return myWinningNumbers;
      })
      .reduce((prev, curr) => prev + curr, 0);
    console.log({ sumOfPoints });

    // Part2

    const part2Ans = [];

    // console.log({ part2Ans });
  });
};

main();
