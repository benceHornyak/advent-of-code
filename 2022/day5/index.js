const fs = require("fs");

const chunkify = (resultArray, item, index) => {
  const chunkIndex = Math.floor(index / 4);

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = []; // start a new chunk
  }

  resultArray[chunkIndex].push(item);

  return resultArray;
};

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const [initialStacks, instructions] = data.split("\n\n");

    const move = ({ ownStack, amount, from, to }) => {
      if (amount !== 0) {
        const toPush = ownStack[from].pop();
        ownStack[to].push(toPush);
        --amount;
        return move({ ownStack, amount: amount, from, to });
      }

      return ownStack;
    };

    const move2 = ({ ownStack, amount, from, to }) => {
      const toPush = ownStack[from].splice(
        ownStack[from].length - amount,
        amount
      );
      ownStack[to].push(...toPush);
      return ownStack;
    };

    const stack = initialStacks
      .split("\n")
      .reverse()
      .map((row) =>
        row
          .split("")
          .reduce(
            (resultArray, item, index) => chunkify(resultArray, item, index),
            []
          )
      )
      .map((rows) => rows.map((s) => s[1]))
      .slice(1)
      .reduce((acc, curr) => {
        curr.forEach((e, i) => {
          if (e !== " ") {
            const key = i + 1;
            const curGroup = acc[key] ?? [];
            acc[key] = [...curGroup, e];
          }
        });
        return acc;
      }, {});

    let stack2 = JSON.parse(JSON.stringify({ ...stack }));
    let stack1 = JSON.parse(JSON.stringify({ ...stack }));

    instructions.split("\n").forEach((commandParts) => {
      const [amount, from, to] = commandParts.match(/\d+/gi).map((v) => +v);
      const f = move({ ownStack: stack1, amount, from, to });
      const f2 = move2({ ownStack: stack2, amount, from, to });

      stack1 = f;
      stack2 = f2;
    });
    // Part1
    const ans = Object.values(stack1).map((rows) => rows.at(-1));
    console.log(ans.join(""));

    // Part2
    const ans2 = Object.values(stack2).map((rows) => rows.at(-1));
    console.log(ans2.join(""));
  });
};

main();
