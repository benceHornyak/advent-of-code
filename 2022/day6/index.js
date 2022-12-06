const fs = require("fs");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    let ans = [];
    let ans2 = [];
    data.split("").forEach((s, i, arr) => {
      if (i > 3) {
        // eh version
        const set = new Set([arr[i - 4], arr[i - 3], arr[i - 2], arr[i - 1]]);
        if (set.size === 4) {
          ans.push(i);
        }
      }
    });

    let l = 0;
    data.split("").forEach((s, i, arr) => {
      if (i > 13) {
        // slightly better...
        const partOfArr = arr.slice(l, i);
        const set = new Set([...partOfArr]);
        if (set.size === 14) {
          ans2.push(i);
        }
        l++;
      }
    });

    // Part1
    console.log(ans[0]);

    // Part2
    console.log(ans2[0]);
  });
};

main();
