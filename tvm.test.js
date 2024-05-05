import { expect, test } from 'vitest'
import { findPercentage } from './utils'
import TVM from './tvm'

export const interestRate = {
    "F": {
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

test('Tests compoundAmount function with rate 0.1 and 2 periods', () => {
  expect(TVM.F.P(findPercentage(10), 2)).toBeCloseTo(-1*1.21);
});

test('Tests presentValueAmount function with rate 0.1 and 2 periods', () => {
  expect(TVM.P.F(findPercentage(10), 2)).toBeCloseTo(-1*(1 / 1.21));
});
