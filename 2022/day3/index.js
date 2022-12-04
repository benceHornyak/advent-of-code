const fs = require("fs");

const genpriorities = () => {
  const obj = {};

  for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    const prio = i - 96;
    const char = String.fromCharCode(i);
    obj[char] = prio;
  }

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const prio = i - 38;
    const char = String.fromCharCode(i);
    obj[char] = prio;
  }

  return obj;
};

const sliceIntoHalf = (charArr) => {
  const half = charArr.length / 2;
  return [charArr.slice(0, half), charArr.slice(half)];
};

const findCommonChar = (compartment1, compartment2) =>
  compartment1.filter((char) => compartment2.includes(char)).join("");

const main = () => {
  fs.readFile("./input.txt", "utf8", (err, data) => {
    const sumOfPriosPart1 = data
      .split("\n")
      .map((row) => {
        const charArr = row.split("");
        return sliceIntoHalf(charArr);
      })
      .map(([compartment1, compartment2]) => {
        return findCommonChar(compartment1, compartment2);
      })
      .map((char) => priorities[char[0]])
      .reduce((a, b) => a + b, 0);
    console.log(sumOfPriosPart1);

    //Part2
    const sumOfPriosPart2 = data
      .split("\n")
      .reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 3);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, [])
      .map((group) => {
        const [line1, line2, line3] = group;
        return line1
          .split("")
          .filter((c) => line2.includes(c) && line3.includes(c));
      })
      .map((char) => priorities[char[0]])
      .reduce((a, b) => a + b, 0);
    console.log(sumOfPriosPart2);
  });
};

const priorities = genpriorities();
main();
// const [a, b] = sliceIntoHalf("vJrwpWtwJgWrhcsFMMfFFhFp");
// console.log(a.split(""));
// console.log(findCommonChar(a.split(""), b.split("")));
