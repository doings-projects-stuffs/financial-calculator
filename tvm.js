import {
    negate
} from "./utils.js";

export const TVM = {
    "F": {
        "P_simple": negate(simpleAmount),
        "P": negate(compoundAmount),
        "A": negate(seriesCompoundAmount),
    },
    "P": {
        "F": negate(presentValue),
        "A": negate(seriesPresentValue),
        "C": negate(geometricSeriesPresentValue)
    },
    "A": {
        "F": negate(sinkingFund),
        "P": negate(capitalRecovery),
        "G": negate(uniformGradientSeries)
    }
}
export default TVM

/**
 * Simple interest rate to compute the factor for future amount owed
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function simpleAmount(i, n) {
    return 1 + (i * n);
}

/**
 * (F/P,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function compoundAmount(i, n) {
    if (n === Infinity) {
        return Infinity;
    }
    return Math.pow(1 + i, n);
}

/**
 * (P/F,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function presentValue(i, n) {
    if (n === Infinity) {
        return 0;
    }
    return 1 / compoundAmount(i, n);
}

/**
 * (P/A,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function seriesPresentValue(i, n) {
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
    if (n === Infinity) {
        return i;
    }
    return 1 / seriesPresentValue(i, n);
}


/**
 * (F/A,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function seriesCompoundAmount(i, n) {
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
    if (n === Infinity) {
        return 0;
    }
    return i / seriesCompoundAmount(i, n);
}

/**
 * (A/G,i,n) time value of money factor
 * @param {number} interest rate (e.g. 0.1 for 10%)
 * @param {number} n number of compounding periods per time interval
 * @returns
 */
export function uniformGradientSeries(i, n) {
    if (n === 0) {
        throw new Error("The number of periods 'n' cannot be zero.");
    }
    else if (n === Infinity) {
        throw new Error("The number of periods 'n' cannot be Infinity.");
    }
    return (1 / i) - (n / (Math.pow(1 + i, n) - 1));
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
        return (1 - Math.pow(((1 + g) / (1 + i)), n)) / (i - g);
    }
}

// console.log(1 * TVM.A.P(0.1, 2)); // in terminal execute node tvm.js
// console.log(1 * TVM.F.P_simple(0.1, 2));
// console.log(1 * TVM.A.G(0.08, 10));
// console.log(1 * TVM.P.C(0.12, 0.1, 6)); // i != g
// console.log(1 * TVM.P.C(0.1, 0.1, 6)); // i = g
// console.log(1 * TVM.P.C(0.12, 0.1, 9999999999999)); // i > g && n is Inf
