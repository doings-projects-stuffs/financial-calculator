import { describe, expect, test } from "vitest";
import { sumOfNaturalNumbers, derivative, newtown_raphson_method } from "../src/utils.js";

// describe("Testing sumOfNaturalNumbers", () => {
//     test.each([
//         [0, 0],
//         [1, 1],
//         [2, 3],
//         [10, 55],
//     ])("sumOfNaturalNumbers(%i) = %i", (n, sum) => {
//         expect(sumOfNaturalNumbers(n)).toBe(sum);
//     });
// });

describe("Testing derivative", () => {
    test.each([
        [() => 1, 1, 0],
        [(x) => x, 1, 1],
        [(x) => x**2, 1, 2],
        [(x) => Math.exp(x), 2, Math.exp(2)],
        [(x) => (3 * x + 1)**5, 2, (5 * (3 * 2 + 1)**4) * 3],
    ])("derivative", (f, x, correct_guess) => {
        expect(derivative(f, 0.00000001)(x)).toBeCloseTo(correct_guess, 3);
    });
});

describe("Testing newtown_raphson_method", () => {
    test.each([
        [1, x => x, 0], // 0 = x => 0 = 0 - x
        [1, x => x**2, Math.sqrt(0.5)], // 0.5 = x^2 => 0 = 0.5 - x^2
    ])("newtown_raphson_method", (x0, f, correct_guess) => {
        expect(newtown_raphson_method(x0, f, derivative(f, 1/1000), 1000)).toBeCloseTo(correct_guess, 4);
    });
});

