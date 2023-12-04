const fs = require("fs");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const readData = data.split("\n");

    const validNumbers = [];

    readData.forEach((row, rowIndex, allData) => {
      for (const match of row.matchAll(/\d+/gm)) {
        const matchEndIndex = match.index + match[0].length;
        const rowBeforeCurrent = rowIndex !== 0 ? rowIndex - 1 : null;
        const rowAfterCurrent =
          rowIndex !== allData.length ? rowIndex + 1 : null;

        const startingIndexColumn = match.index !== 0 ? match.index - 1 : 0;
        const endIndexColumn =
          matchEndIndex !== row.length ? matchEndIndex : row.length - 1;

        const isThereSomethingOnUpperRow =
          rowBeforeCurrent !== null
            ? readData[rowBeforeCurrent]
                .slice(startingIndexColumn, endIndexColumn + 1)
                .split("")
                .some((char) => new RegExp(/([^\d\.]+)/).test(char))
            : false;

        const isThereSomethingOnLowerRow =
          rowAfterCurrent !== null && readData[rowAfterCurrent] !== undefined
            ? readData[rowAfterCurrent]
                .slice(startingIndexColumn, endIndexColumn + 1)
                .split("")
                .some((char) => new RegExp(/([^\d\.]+)/).test(char))
            : false;

        const isThereSomeThingBefore =
          readData[rowIndex][match.index - 1] !== undefined
            ? new RegExp(/([^\d\.]+)/).test(readData[rowIndex][match.index - 1])
            : false;

        const isThereSomeThingAfter =
          readData[rowIndex][matchEndIndex] !== undefined
            ? new RegExp(/([^\d\.]+)/).test(readData[rowIndex][matchEndIndex])
            : false;

        const wasThereALegitStuff = [
          isThereSomethingOnUpperRow,
          isThereSomeThingBefore,
          isThereSomeThingAfter,
          isThereSomethingOnLowerRow,
        ].some(Boolean);

        if (wasThereALegitStuff) {
          validNumbers.push(match[0]);
        }
      }
    });

    // Part1
    const part1Ans = validNumbers
      .map((str) => parseInt(str))
      .reduce((prev, curr) => prev + curr, 0);

    console.log({ part1Ans });

    // Part2

    const part2Ans = readData.map((row, rowIndex, allData) => {
      for (const asterik of row.matchAll(/\*/gm)) {
        console.log(
          `===---=== Found ${asterik[0]} start=${asterik.index} end=${
            asterik.index + asterik[0].length
          }. ===---===`
        );

        const matchEndIndex = asterik.index + asterik[0].length;
        const rowBeforeCurrent = rowIndex - 1;
        const rowAfterCurrent = rowIndex + 1;

        const startingIndexColumn = asterik.index - 3;
        const endIndexColumn = matchEndIndex;

        const upperRow = readData[rowBeforeCurrent].slice(
          startingIndexColumn,
          endIndexColumn + 3
        );

        console.log(upperRow);

        for (const numberBlock of upperRow.matchAll(/\d+/g)) {
          console.log(
            `Found ${numberBlock[0]} start=${numberBlock.index} end=${
              numberBlock.index + numberBlock[0].length
            }.`
          );

          if (
            numberBlock.index <= asterik.index &&
            numberBlock.index + numberBlock[0].length <=
              asterik.index + asterik[0].length
          ) {
            console.log("valami itten van fent heloka");
          }
        }
        const midRow = readData[rowIndex].slice(
          asterik.index - 3,
          asterik.index + asterik[0].length + 3
        );

        console.log(midRow);

        const bottomRow = readData[rowAfterCurrent].slice(
          startingIndexColumn,
          endIndexColumn + 3
        );

        console.log(bottomRow);

        for (const numberBlock of bottomRow.matchAll(/\d+/g)) {
          console.log(
            `Found ${numberBlock[0]} start=${numberBlock.index} end=${
              numberBlock.index + numberBlock[0].length
            }.`
          );

          if (
            numberBlock.index <= asterik.index &&
            numberBlock.index + numberBlock[0].length <=
              asterik.index + asterik[0].length
          ) {
            console.log("valami itten van lent heloka");
          }
        }
      }
      return row;
    });

    // console.log({ part2Ans });
  });
};

main();
