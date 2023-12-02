const fs = require("fs");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const readData = data.split("\n");

    const rules = {
      red: 12,
      green: 13,
      blue: 14,
    };

    const gameMap = readData
      .map((row) => row.split(":"))
      .reduce((prev, curr) => {
        const gameId = curr[0].split(" ")[1];
        const perGameColors = curr[1].split(";");

        const foo = perGameColors.map((str) => {
          return str
            .trim()
            .split(", ")
            .map((colors) => colors.trim().split(" "))
            .map(([value, colorKey]) => ({ [colorKey]: +value }))
            .reduce((prev, curr) => {
              return {
                ...prev,
                ...curr,
              };
            }, {});
        });

        const isPossible = foo.every((x) => {
          return Object.entries(x).every(([colorKey, colorValue]) => {
            return rules[colorKey] >= colorValue;
          });
        });
        if (isPossible) {
          prev.set(+gameId, "");
        }
        return prev;
      }, new Map());

    // Part1
    const part1Ans = [...gameMap.keys()].reduce((prev, curr) => prev + curr, 0);

    console.log({ part1Ans });

    // Part2

    const part2Ans = readData
      .map((row) => row.split(":")[1].trim())
      .map((games) => games.split("; "))
      .map((game) =>
        game
          .map((cubes) => {
            const splitted = cubes.split(", ").map((cube) => {
              const [value, color] = cube.split(" ");
              return { [color]: +value };
            });
            return splitted;
          })
          .flat()
      )
      .map((item) => {
        const biggestColors = {
          blue: 1,
          red: 1,
          green: 1,
        };

        item.forEach((colorObject) => {
          Object.entries(colorObject).forEach(([color, value]) => {
            const currentBiggestNumber = biggestColors[color];
            if (value > currentBiggestNumber) {
              biggestColors[color] = value;
            }
          });
        });

        const { red, blue, green } = biggestColors;

        console.log(item);
        console.log(red * blue * green);
        return red * blue * green;
      })
      .reduce((prev, curr) => prev + curr, 0);

    console.log({ part2Ans });
  });
};

main();
