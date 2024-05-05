import {
    negate
} from "./utils";

export const TVM = {
    "F": {
        "P": negate(simpleAmount),
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
        "G": uniformGradientSeries
    }
}
export default TVM

/**
 * Simple interest rate to compute the factor for future amount owed
 * @param {number} i interest rate (e.g. 10 for 10%) (e.g. 10 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function simpleAmount(i, n) {
    return 1 + (i * n);
}

/**
 * (F/P,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 10 for 10%) (e.g. 10 for 10%)
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
 * @param {number} i interest rate (e.g. 10 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function presentValue(i, n) {
    if (n === Infinity) {
        return 0;
    }
    return 1 / Math.pow(1 + i, n);
}

/**
 * (F/A,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 10 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function seriesCompoundAmount(i, n) {
    if (n === Infinity) {
        return Infinity;
    }
    return (Math.pow(1 + i, n) - 1) / i;
}

/**
 * (P/A,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 10 for 10%)
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
 * @param {number} i interest rate (e.g. 10 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function capitalRecovery(i, n) {
    if (n === Infinity) {
        return i;
    }
    return i / (1 - Math.pow(1 + i, -n));
}

/**
 * (A/F,i,n) time value of money factor
 * @param {number} i interest rate (e.g. 10 for 10%)
 * @param {number} n number of compounding periods per time interval
 */
export function sinkingFund(i, n) {
    if (n === Infinity) {
        return 0;
    }
    return i / (Math.pow(1 + i, n) - 1);
}

/**
 * (A/G,i,n) time value of money factor
 * @param {number} interest rate (e.g. 10 for 10%)
 * @param {number} n number of compounding periods per time interval
 * @returns
 */
export function uniformGradientSeries(i, n) {
    return (1 / i) - (n / (Math.pow(1 + i, n) - 1))
}

/**
 * @param {number} i interest rate (e.g. 10 for 10%)
 * @param {number} g uniform gradient series factor (e.g. 3 for 3%)
 * @param {number} n number of compounding periods per time interval
 */
export function geometricSeriesPresentValue(i, g, n) {
    if (i > g) {
        return 1 / (i - g);
    } else if (i === g) {
        return n / (1 + g);
    } else {
        return (1 - Math.pow(((1 + g) / (1 + i)), n)) / (i - g);
    }
}

// console.log(100 * TVM.F.P(0.1, 2));
