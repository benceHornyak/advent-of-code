const fs = require("fs");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const readData = data.split("\n");

    // Part1
    const part1Ans = readData
      .map((row) => {
        const numbers = row.replace(/\D/g, "", "");
        return +`${numbers[0]}${numbers.at(-1)}`;
      })
      .reduce((prev, curr) => prev + curr, 0);

    console.log({ part1Ans });

    // Part2
    const numbersObject = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    const part2Ans = readData
      .map((row) => {
        Object.keys(numbersObject).forEach((key) => {
          const indexToInsert = row.indexOf(key);
          if (indexToInsert !== -1) {
            for (const match of row.matchAll(key)) {
              row =
                row.substring(0, match.index + 1) +
                `${numbersObject[key]}` +
                row.substring(match.index + 2, row.length);
            }
          }
        });
        return row;
      })
      .map((row) => row.split("").filter((char) => !isNaN(parseInt(char))))
      .map((rowNumber) => +`${rowNumber[0]}${rowNumber.at(-1)}`)
      .reduce((prev, curr) => prev + curr, 0);

    console.log({ part2Ans });
  });
};

main();
