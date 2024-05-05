export const TVM = {
    "F": {
        "P": compoundAmount,
        // "A": seriesCompoundAmount,
    },
    "P": {
        "F": presentValueAmount,
        // "A": seriesPresentValue,
        "C": geometricSeriesPresentValue
    },
    // "A": {
    //     "F": sinkingFund,
    //     "P": capitalRecovery,
    //     "G": uniformGradientSeries
    //}
};

export default TVM

/**
* @param {number} i interest rate
* @param {number} n number of compounding periods per time interval
*/
export function compoundAmount(i, n) {
    if (n === Infinity) {
        return Infinity;
    }
    return Math.pow(1 + i, n);
}

/**
* @param {number} i interest rate
* @param {number} n number of compounding periods per time interval
*/
export function presentValueAmount(i, n) {
    if (n === Infinity) {
        return 0;
    }
    return 1 / Math.pow(1 + i, n);
}

/**
* @param {number} i interest rate
* @param {number} g uniform gradient series factor
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
