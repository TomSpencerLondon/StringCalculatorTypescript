import { stringCalculator } from "../src/string-calculator";

describe("String Calculator", () => {
  it.each([
    ["1", 1],
    ["1,2", 3],
    ["1, 2, 3, 4, 5, 6", 21],
    ["1\n2,3", 6],
    ["//;\n1;2", 3],
    ["1001, 2", 2],
    ["//[***]\n1***2***3", 6],
    ["//[*][%]\n1*2%3", 6],
  ])("returns %s for %s", (input: string, expected: number) => {
    expect(stringCalculator(input)).toEqual(expected);
  });

  it("throws an exception for negatives", () => {
    const result = () => {
      stringCalculator("1,-2,-3");
    };
    expect(result).toThrow(new Error("error: negatives not allowed: -2 -3"));
  });
});
