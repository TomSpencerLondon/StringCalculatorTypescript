import {stringCalculator} from "../src/string-calculator";

const each = require("jest-each").default;

describe("String Calculator", () => {
  each([
    ["1", 1],
    ["1,2", 3],
    ["1, 2, 3, 4, 5, 6", 21],
    ["1\n2,3", 6],
    ["//;\n1;2", 3],
    ["1001, 2", 2],
    ["//[***]\n1***2***3", 6]
  ]).test("returns %s for %s", (input, expected) => {
    expect(stringCalculator(input)).toEqual(expected);
  });

  it("throws an exception for negatives", () => {
    const result = () => {
      stringCalculator("1,-2,-3");
    };
    expect(result).toThrow(new Error("error: negatives not allowed: -2 -3"));
  });
})
