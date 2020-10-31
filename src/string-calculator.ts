export const stringCalculator = (input: string): number => {
  const array = input.split(/[,\n]/);
  const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue);

  return array.reduce(reducer, 0);
};
