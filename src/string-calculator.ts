export const stringCalculator = (input: string): number => {
  return performAdd(fixLargeNumbers(checkNegatives(stringToNumbers(input))));
};

const performAdd = (numbers: number[]) => {
  return numbers.reduce((accumulator, number) => accumulator + number, 0);
};

const stringToNumbers = (args: string) => {
  const delimiters = getDelimiters(args);
  const numbers = args.split("\n");
  return splitOnDelimiters(numbers, delimiters);
};

const getDelimiters = (args) => {
  const matcher = /\/\/(.*?)\n/;
  const result = matcher.exec(args);
  if (result) {
    return result[1].split(/\[|\]/).filter((delim) => {
      return !!delim.length;
    });
  } else {
    return [","];
  }
};

const splitOnDelimiters = (numbers, delimiters) => {
  for (const delimiter of delimiters) {
    numbers = numbers.reduce((accumulator, number) => {
      return accumulator.concat(number.split(delimiter));
    }, []);
  }

  return numbers.map((num) => {
    return parseInt(num) || 0;
  });
};

const checkNegatives = (numbers) => {
  const negatives = numbers.filter((num) => {
    return num < 0;
  });
  if (negatives.length > 0) {
    throw new Error("error: negatives not allowed: " + negatives.join(" "));
  } else {
    return numbers;
  }
};

const fixLargeNumbers = (numbers) => {
  return numbers.filter(function (num) {
    return num < 1000;
  });
};
