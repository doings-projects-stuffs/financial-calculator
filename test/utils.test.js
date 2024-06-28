import { describe, expect, test } from "vitest";
import { sumOfNaturalNumbers, newtown_raphson_method } from "../src/utils.js";

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

describe("Testing newtown_raphson_method", () => {
    test.each([
        [1, x => x, () => 1, 0.0001, 0.0001, 1000, 0],
        [1, x => x**2, () => 1, 0.0001, 0.0001, 1000, 0],
    ])("newtown_raphson_method", (x0, f, f_prime, tolerance, epsilon, max_iterations, correct_guess) => {
        expect(newtown_raphson_method(x0, f, f_prime, tolerance, epsilon, max_iterations)).toBeCloseTo(correct_guess, 4);
    });
});

