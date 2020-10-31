import {stringCalculator} from "../src/string-calculator";

const each = require("jest-each").default;

describe("String Calculator", () => {
  each([
    ["1", 1],
  ]).test("returns %s for %s", (input, expected) => {
    expect(stringCalculator(input)).toEqual(expected);
  });
})
