const TVM = {
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

function compoundAmount(i, n) {
    if (n === Infinity) {
        return Infinity;
    }
    return Math.pow(1 + i, n);
}

function presentValueAmount(i, n) {
    if (n === Infinity) {
        return 0;
    }
    return 1 / Math.pow(1 + i, n);
}

function geometricSeriesPresentValue(i, g, n) {
    if (i > g) {
        return 1 / (i - g);
    } else if (i === g) {
        return n / (1 + g);
    } else {
        return (1 - Math.pow(((1 + g) / (1 + i)), n)) / (i - g);
    }
}

module.exports = TVM;  // Export the TVM object



// console.log("Hello world")

// console.log(1 * TVM["F"]["P"](10, 999999999))
// console.log(1 * TVM["P"]["F"](10, 99999999))