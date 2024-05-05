const TVM = {
    "F": {
        "P": compountAmount,
        "A": seriesCompoundAmount,
    },
    "P": {
        "F": presentValueAmount,
        "A": seriesPresentValue,
        "C": geometricSeriesPresentValue
    },
    "A": {
        "F": sinkingFund,
        "P": capitalRecovery,
        "G": uniformGradientSeries
    }
}

/**
 * (F/P,i,n)
 * @param {number} i
 * @param {number} n
 */
function compountAmount(i, n) {
    if (n === Infinity) {
        return Infinity
    }
    return Math.pow(1 + i, n)
}

/**
 * @param {number} i
 * @param {number} n
 */
function presentValueAmount(i, n) {
    if (n === Infinity) {
        return 0
    }
    return 1 / Math.pow(1 + i, n)
}

/**
 * Factor calculations for (P/C,i,g,inf) and (P/C,i,g,n)
 * @param {number} i interest rate
 * @param {number} g compound rate
 * @param {number} n
 * @returns
 */
function geometricSeriesPresentValue(i, g, n) {
    if (i > g) { // (P/C,i,g,inf)
        return 1 / (i - g)
    } else if (i === g) {
        return n / (1 + g)
    } else {// i != g
        return (1 - Math.pow(((1 + g) / (1 + i)), n)) / (i - g) // (P/C,i,g,n)
    }
}

console.log("Hello world")

console.log(1 * TVM["F"]["P"](10, 999999999))
console.log(1 * TVM["P"]["F"](10, 99999999))

