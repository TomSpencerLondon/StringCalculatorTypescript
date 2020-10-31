export const stringCalculator = (input: string): number => {
  const array = input.split(",");
  const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue);

  return array.reduce(reducer, 0);
};
