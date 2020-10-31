export const stringCalculator = (input: string): number => {
  return performAdd(fixLargeNumbers(checkNegatives(stringToNumbers(input))));
};

const performAdd = (numbers: number[]) => {
  return numbers.reduce((accumulator, number) => accumulator + number, 0);
}

// Split the specs into array of numbers
const stringToNumbers = (args) => {
  let config = getConfig(args);
  let numbers = config.input.split("\n");
  return splitOnDelimiters(numbers, config.delimiters);
}

const splitOnDelimiters = (numbers, delimiters) => {
  if (delimiters.length === 0) {
    return numbers.map(function (num) {
      return (parseInt(num) || 0); // If +num is NaN be lenient and return 0
    });
  }
  let delimiter = delimiters.pop();
  let newNums = numbers.reduce(function (accumulator, number) {
    return accumulator.concat(number.split(delimiter));
  }, []);
  return splitOnDelimiters(newNums, delimiters);
}

const checkNegatives = (numbers) => {
  let negatives = numbers.filter((num) => {
    return num < 0;
  });
  if (negatives.length > 0) {
    throw new Error("error: negatives not allowed: " + negatives.join(" "));
  } else {
    return numbers;
  }
}

function fixLargeNumbers(numbers) {
  return numbers.filter(function (num) {
    return num < 1000;
  });
}

function getConfig(args) {
  var matcher = /\/\/(.*?)\n/;
  var result = matcher.exec(args);
  if (result) {
    return {delimiters: getDelimiters(result[1]), input: args.slice(matcher.lastIndex)};
  } else {
    return {delimiters: [","], input: args};
  }
}

/*
  This function extracts the delimiters from specs
  e.g.
  '[**]'    -> ['**']
  '[**][%]' -> ['**', '%']
 */
function getDelimiters(args) {
  return args.split(/\[|\]/).filter(function (delim) {
    return !!delim.length;
  });
}
