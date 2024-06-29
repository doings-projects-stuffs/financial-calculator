import { negate, sumOfNaturalNumbers } from "./utils.js";

/**
 * @constant
 */
export const TVM = {
    F: {
        P_simple: negate(simpleAmount),
        P: negate(compoundAmount),
        A: negate(seriesCompoundAmount),
    },
    P: {
        F: negate(presentValue),
        A: negate(seriesPresentValue),
        C: negate(geometricSeriesPresentValue),
    },
    A: {
        F: negate(sinkingFund),
        P: negate(capitalRecovery),
        G: negate(uniformGradientSeries),
    },
};
export default TVM;

/**
 * Simple interest rate to compute the factor for future amount owed
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function simpleAmount(i, n) {
    return 1 + i * n;
}

/**
 * (F/P,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function compoundAmount(i, n) {
    if (i === 0) {
        return 1;
    }
    if (n === Infinity) {
        return Infinity;
    }
    return Math.pow(1 + i, n);
}

// F = P(1 + i)^n
// 3 = 1(1 + i)^2
// 0 = 1(1 + i)^2 - 3
// 0 = P(1 + i)^n - F
// derivative(random_i) = [ P(1 + i + di)^n - F ] - [ P(1 + i - di)^n - F ]

/**
 * (P/F,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function presentValue(i, n) {
    if (i === 0) {
        return 1;
    }
    if (n === Infinity) {
        return 0;
    }
    return 1 / Math.pow(1 + i, n);
}

/**
 * (P/A,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function seriesPresentValue(i, n) {
    if (i === 0) {
        return n;
    }
    if (n === Infinity) {
        return 1 / i;
    }
    return (1 - Math.pow(1 + i, -n)) / i;
}

/**
 * (A/P,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function capitalRecovery(i, n) {
    if (i === 0) {
        return 1 / n;
    }
    if (n === Infinity) {
        return i;
    }
    return i / (1 - Math.pow(1 + i, -n));
}

/**
 * (F/A,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function seriesCompoundAmount(i, n) {
    if (i === 0) {
        return n;
    }
    if (n === Infinity) {
        return Infinity;
    }
    return (Math.pow(1 + i, n) - 1) / i;
}

/**
 * (A/F,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function sinkingFund(i, n) {
    if (i === 0) {
        return 1 / n;
    }
    if (n === Infinity) {
        return 0;
    }
    return i / (Math.pow(1 + i, n) - 1);
}

/**
 * (A/G,i,n) time value of money factor
 * @param {number} interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 * @returns
 */
export function uniformGradientSeries(i, n) {
    if (n === Infinity) {
        return Infinity;
    }
    if (i === 0) {
        // might be off by one
        return n > 1 ? sumOfNaturalNumbers(n - 1) / n : 0;
    }
    if (n === 0) {
        throw new Error("n cannot be zero");
    }
    return 1 / i - n / (Math.pow(1 + i, n) - 1);
}

/**
 * (P/C,i,g,n)
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} g uniform gradient series factor (e.g. 0.03 for 3%)
 * @param {number} n number of compounding periods per time interval
 */
export function geometricSeriesPresentValue(i, g, n) {
    if (i > g && n === Infinity) {
        return 1 / (i - g);
    } else if (i === g) {
        return n / (1 + g);
    } else {
        return (1 - Math.pow((1 + g) / (1 + i), n)) / (i - g);
    }
}

// console.log(1 * TVM.A.P(0.1, 2)); // in terminal execute node tvm.js
// console.log(1 * TVM.F.P_simple(0.1, 2));
// console.log(1 * TVM.A.G(0.08, 10));
// console.log(1 * TVM.P.C(0.12, 0.1, 6)); // i != g
// console.log(1 * TVM.P.C(0.1, 0.1, 6)); // i = g
// console.log(1 * TVM.P.C(0.12, 0.1, 9999999999999)); // i > g && n is Inf
