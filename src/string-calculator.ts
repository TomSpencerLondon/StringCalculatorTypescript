export const stringCalculator = (input: string): number => {
  let customSeperator = "";
  if(input.startsWith("//")){
    customSeperator += input[2];
    input = input.slice(input.indexOf("\n") + 1);
  }
  let regex = new RegExp("[,\n" + customSeperator + "]");
  const array = input.split(regex);
  const reducer = (accumulator, currentValue) => {
    let number = parseInt(currentValue);
    if (number < 0){
      throw new Error("error: negatives not allowed: -2 -3");
    }
      return accumulator + number;
  };

  return array.reduce(reducer, 0);
};
