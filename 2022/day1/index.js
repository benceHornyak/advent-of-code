const fs = require("fs");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const arr = data
      .split("\n\n")
      .map((row) => row.split("\n").map((v) => Number(v)));

    // Part1
    const mostCaloryPerElf = arr.reduce((acc, curr) => {
      const amountPerElf = curr.reduce((a, b) => a + b, 0);
      if (amountPerElf > acc) {
        acc = amountPerElf;
      }
      return acc;
    }, 0);

    console.log({ mostCaloryPerElf });

    // Part2
    const top3 = arr.reduce(
      (acc, curr) => {
        const amountPerElf = curr.reduce((a, b) => a + b, 0);
        const { top1, top2, top3 } = acc;

        if (amountPerElf > top1) {
          acc.top2 = top1;
          acc.top1 = amountPerElf;
        } else if (amountPerElf > top2) {
          acc.top3 = top2;
          acc.top2 = amountPerElf;
        } else if (amountPerElf > top3) {
          acc.top3 = amountPerElf;
        }

        console.log({ top1, top2, top3 });
        console.log(acc);

        return acc;
      },
      { top1: 0, top2: 0, top3: 0 }
    );

    const sumOfTop3 = Object.values(top3).reduce((a, b) => a + b, 0);

    console.log({ sumOfTop3 });
  });
};

main();
