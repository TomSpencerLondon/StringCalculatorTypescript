export const stringCalculator = (input: string): number => {
  return performAdd(fixLargeNumbers(checkNegatives(stringToNumbers(input))));
};

const performAdd = (numbers: number[]): number => {
  return numbers.reduce((accumulator, number) => accumulator + number, 0);
};

const stringToNumbers = (args: string): number[] => {
  const delimiters = getDelimiters(args);
  const numbers = args.split("\n");
  return splitOnDelimiters(numbers, delimiters);
};

const getDelimiters = (args): string[] => {
  const matcher = /\/\/(.*?)\n/;
  const result = matcher.exec(args);
  if (result) {
    return result[1].split(/\[|\]/).filter((delim) => {
      return delim.length > 0;
    });
  } else {
    return [","];
  }
};

const splitOnDelimiters = (numbers, delimiters): number[] => {
  for (const delimiter of delimiters) {
    numbers = numbers.reduce((accumulator, number) => {
      return accumulator.concat(number.split(delimiter));
    }, []);
  }

  return numbers.map((num) => {
    return parseInt(num) || 0;
  });
};

const checkNegatives = (numbers): number[] => {
  const negatives = numbers.filter((num) => {
    return num < 0;
  });
  if (negatives.length > 0) {
    throw new Error("error: negatives not allowed: " + negatives.join(" "));
  } else {
    return numbers;
  }
};

const fixLargeNumbers = (numbers): number[] => {
  return numbers.filter(function (num) {
    return num < 1000;
  });
};
