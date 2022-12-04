const fs = require("fs");

const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i);

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const rows = data
      .split("\n")
      .map((row) => row.split(","))
      .map(([elf1, elf2]) => {
        const [elf1Start, elf1Stop] = elf1.split("-");
        const [elf2Start, elf2Stop] = elf2.split("-");
        const elf1Range = range(+elf1Start, +elf1Stop);
        const elf2Range = range(+elf2Start, +elf2Stop);
        const elf1Covers = elf1Range.every((elem) => elf2Range.includes(elem));

        const elf2Covers = elf2Range.every((elem) => elf1Range.includes(elem));

        return elf1Covers || elf2Covers;
      }).reduce((acc, curr) => {
        if (curr) {
            acc++;
        }
        return acc;
      }, 0);

    console.log(rows);

    const rowsPart2 = data
    .split("\n")
    .map((row) => row.split(","))
    .map(([elf1, elf2]) => {
      const [elf1Start, elf1Stop] = elf1.split("-");
      const [elf2Start, elf2Stop] = elf2.split("-");
      const elf1Range = range(+elf1Start, +elf1Stop);
      const elf2Range = range(+elf2Start, +elf2Stop);
      const elf1Covers = elf1Range.some((elem) => elf2Range.includes(elem));

      const elf2Covers = elf2Range.some((elem) => elf1Range.includes(elem));

      return elf1Covers || elf2Covers;
    }).reduce((acc, curr) => {
      if (curr) {
          acc++;
      }
      return acc;
    }, 0);

  console.log(rowsPart2);
  });
};

main();
