import { describe, expect, test } from "vitest";
import { sumOfNaturalNumbers } from "../src/utils.js";

describe("Testing sumOfNaturalNumbers", () => {
    test.each([
        [0, 0],
        [1, 1],
        [2, 3],
        [10, 55],
    ])("sumOfNaturalNumbers(%i) = %i", (n, sum) => {
        expect(sumOfNaturalNumbers(n)).toBe(sum);
    });
});
