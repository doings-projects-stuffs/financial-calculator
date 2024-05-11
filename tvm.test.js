import { describe, expect, it, test } from 'vitest';
import { TVM } from './tvm.js';
import { findPercentage } from './utils.js';

const is = [0.1, 1, 10, 100, 1000]; // interest rate in percentage
const ns = [0, 1, 2, 10, 100, 1000, Infinity]; // number of periods
const gs = [0, 0.5, 1, 5, 10, 20];  // growth rates in percentage for the Geometric Series

describe('Testing Simple Interest Rate', () => {
	test.each([
		// n,   i,   EXPECTED
        [  0,   0,   -1],
        [  1,   0,   -1],
        [  1,   50,  -1.5],
        [  1,   100, -2],
        [  2,   50,  -2],
        [  2,   100, -3],
    ])('Periods %i, Rate %f%%, Returns %f', (i, n, expectedOutput) => {
    	expect(TVM.F.P_simple(findPercentage(i), n)).toBeCloseTo(expectedOutput)
    })
})

describe('Testing TVM Formulas: (F/P,i,n), (P/F,i,n), (F/A,i,n), (A/F,i,n), (P/A,i,n), (A/P,i,n)', () => {
    is.forEach(i => {
        ns.forEach(n => {
            const interestDecimal = findPercentage(i);
            var expectedOutput;

            it(`Tests compoundAmount function with rate ${i}% and ${n} periods`, () => {
                expectedOutput = -1 * Math.pow(1 + interestDecimal, n);
                expect(TVM.F.P(interestDecimal, n)).toBeCloseTo(expectedOutput);
            });

            it(`Tests presentValueAmount function with rate ${i}% and ${n} periods`, () => {
                expectedOutput = -1 * (1 / Math.pow(1 + interestDecimal, n));
                expect(TVM.P.F(interestDecimal, n)).toBeCloseTo(expectedOutput);
            });

            it(`Tests seriesCompoundAmount function with rate ${i}% and ${n} periods`, () => {
                expectedOutput = -1 * ((Math.pow(1 + interestDecimal, n) - 1) / interestDecimal);
                expect(TVM.F.A(interestDecimal, n)).toBeCloseTo(expectedOutput);
            });

            it(`Tests seriesPresentValue function with rate ${i}% and ${n} periods`, () => {
                expectedOutput = -1 * ((1 - Math.pow(1 + interestDecimal, -n)) / interestDecimal);
                expect(TVM.P.A(interestDecimal, n)).toBeCloseTo(expectedOutput);
            });

            it(`Tests capitalRecovery function with rate ${i}% and ${n} periods`, () => {
                expectedOutput = -1 * (interestDecimal / (1 - Math.pow(1 + interestDecimal, -n)));
                expect(TVM.A.P(interestDecimal, n)).toBeCloseTo(expectedOutput);
            });

            it(`Tests sinkingFund function with rate ${i}% and ${n} periods`, () => {
                expectedOutput = -1 * (interestDecimal / (Math.pow(1 + interestDecimal, n) - 1));
                expect(TVM.A.F(interestDecimal, n)).toBeCloseTo(expectedOutput);
            });
        });
    });
});

describe('Testing Uniform Gradient Series (A/G,i,n)', () => {
    is.forEach(i => {
        ns.forEach(n => {
            const interestDecimal = findPercentage(i);
            var expectedOutput;

            if (n === 0) {
                it(`Throws exception when n is 0 with interest rate ${i}%`, () => {
                    expect(() => {
                        TVM.A.G(interestDecimal, n);
                    }).toThrow("The number of periods 'n' cannot be zero.");
                });
            }
            else if (n === Infinity) {
                it(`Throws exception when n is Infinity with interest rate ${i}%`, () => {
                    expect(() => {
                        TVM.A.G(interestDecimal, n);
                    }).toThrow("The number of periods 'n' cannot be Infinity.");
                });
            } else {
                expectedOutput = -1 * ((1 / interestDecimal) - (n / (Math.pow(1 + interestDecimal, n) - 1)));
                it(`Tests uniformGradientSeries function with rate ${i}% and ${n} periods`, () => {
                    expect(TVM.A.G(interestDecimal, n)).toBeCloseTo(expectedOutput);
                });
            }
        });
    });
});

describe('Testing Geometric Series Present Value (P/C,i,g,n)', () => {
    is.forEach(i => {
        gs.forEach(g => {
            ns.forEach(n => {
                const interestDecimal = findPercentage(i);
                const growthDecimal = findPercentage(g);
                var expectedOutput;

                it(`Tests geometricSeriesPresentValue function with rate ${i}% and growth ${g}% over ${n} periods`, () => {
                    if (interestDecimal > growthDecimal && n === Infinity) {
                        expectedOutput = -1 * (1 / (interestDecimal - growthDecimal));
                    } else if (interestDecimal === growthDecimal) {
                        expectedOutput = -1 * (n / (1 + growthDecimal));
                    } else {
                        expectedOutput = -1 * ((1 - Math.pow((1 + growthDecimal) / (1 + interestDecimal), n)) / (interestDecimal - growthDecimal));
                    }
                    expect(TVM.P.C(interestDecimal, growthDecimal, n)).toBeCloseTo(expectedOutput);
                });
            });
        });
    });
});


// in terminal execute npm test
