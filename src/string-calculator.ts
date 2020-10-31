export const stringCalculator = (input: string): number => {
  let customSeperator = "";
  if(input.startsWith("//")){
    customSeperator += input[2];
    input = input.slice(input.indexOf("\n") + 1);
  }
  let regex = new RegExp("[,\n" + customSeperator + "]");
  const array = input.split(regex).filter((n) => parseInt(n) < 1000);
  let negativeError = [];
  const reducer = (accumulator, currentValue) => {
    let number = parseInt(currentValue);
    if (number < 0){
      negativeError.push(number);
    }
    if (negativeError.length > 0){
      return 0;
    }
    return accumulator + number;
  };

  const result = array.reduce(reducer, 0);

  if (negativeError.length > 0){
    throw new Error("error: negatives not allowed: " + negativeError.join(" "));
  }

  return result;
};
