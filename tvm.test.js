import { describe, expect, it, test } from 'vitest';
import { TVM } from './tvm.js';
import { findPercentage } from './utils.js';

describe('Testing Simple Interest Rate', () => {
	test.each([
        { n: 0, i: 0,  expected: -1   },
        { n: 0, i: 50,  expected: -1   },
        { n: 1, i: 50, expected: -1.5 },
        { n: 1, i: 100,expected: -2   },
        { n: 2, i: 50, expected: -2   },
        { n: 2, i: 100,expected: -3   },
        { n: Infinity, i: 0, expected: NaN },
        { n: Infinity, i: 50, expected: -Infinity },
    ])('n=$n, i=$i, P_simple($i, $n)=$expected', ({ n, i,  expected }) => {
    	expect(TVM.F.P_simple(findPercentage(i), n)).toBeCloseTo(expected);
    })
})

describe('Testing TVM Formulas: (F/P,i,n), (P/F,i,n), (F/A,i,n), (A/F,i,n), (P/A,i,n), (A/P,i,n)', () => {
    describe('Testing (F/P,i,n) and (P/F,i,n)', () => {
        test.each([
            { n: 0, i: 0,  value: -1   },
            { n: 0, i: 50,  value: -1   },
            { n: 0, i: Infinity,  value: -1   },
            { n: 1, i: 0,  value: -1   },
            { n: 1, i: 50, value: -1.5 },
            { n: 1, i: 100,value: -2   },
            { n: 2, i: 50, value: -2.25   },
            { n: 2, i: 100,value: -4   },
            { n: Infinity, i: 0, value: NaN },
            { n: Infinity, i: 50, value: -Infinity },
        ])('(F/P,$i,$n)=1/(P/F,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.F.P(findPercentage(i), n)).toBeCloseTo(value);
            expect(1/TVM.P.F(findPercentage(i), n)).toBeCloseTo(value);
        }))
    })
})


// describe('Testing TVM Formulas: (F/P,i,n), (P/F,i,n), (F/A,i,n), (A/F,i,n), (P/A,i,n), (A/P,i,n)', () => {
//     is.forEach(i => {
//         ns.forEach(n => {
//             const interestDecimal = findPercentage(i);
//             var expectedOutput;

//             it(`Tests compoundAmount function with rate ${i}% and ${n} periods`, () => {
//                 expectedOutput = -1 * Math.pow(1 + interestDecimal, n);
//                 expect(TVM.F.P(interestDecimal, n)).toBeCloseTo(expectedOutput);
//             });

//             it(`Tests presentValueAmount function with rate ${i}% and ${n} periods`, () => {
//                 expectedOutput = -1 * (1 / Math.pow(1 + interestDecimal, n));
//                 expect(TVM.P.F(interestDecimal, n)).toBeCloseTo(expectedOutput);
//             });

//             it(`Tests seriesCompoundAmount function with rate ${i}% and ${n} periods`, () => {
//                 expectedOutput = -1 * ((Math.pow(1 + interestDecimal, n) - 1) / interestDecimal);
//                 expect(TVM.F.A(interestDecimal, n)).toBeCloseTo(expectedOutput);
//             });

//             it(`Tests seriesPresentValue function with rate ${i}% and ${n} periods`, () => {
//                 expectedOutput = -1 * ((1 - Math.pow(1 + interestDecimal, -n)) / interestDecimal);
//                 expect(TVM.P.A(interestDecimal, n)).toBeCloseTo(expectedOutput);
//             });

//             it(`Tests capitalRecovery function with rate ${i}% and ${n} periods`, () => {
//                 expectedOutput = -1 * (interestDecimal / (1 - Math.pow(1 + interestDecimal, -n)));
//                 expect(TVM.A.P(interestDecimal, n)).toBeCloseTo(expectedOutput);
//             });

//             it(`Tests sinkingFund function with rate ${i}% and ${n} periods`, () => {
//                 expectedOutput = -1 * (interestDecimal / (Math.pow(1 + interestDecimal, n) - 1));
//                 expect(TVM.A.F(interestDecimal, n)).toBeCloseTo(expectedOutput);
//             });
//         });
//     });
// });

// describe('Testing Uniform Gradient Series (A/G,i,n)', () => {
//     is.forEach(i => {
//         ns.forEach(n => {
//             const interestDecimal = findPercentage(i);
//             var expectedOutput;

//             if (n === 0) {
//                 it(`Throws exception when n is 0 with interest rate ${i}%`, () => {
//                     expect(() => {
//                         TVM.A.G(interestDecimal, n);
//                     }).toThrow("The number of periods 'n' cannot be zero.");
//                 });
//             }
//             else if (n === Infinity) {
//                 it(`Throws exception when n is Infinity with interest rate ${i}%`, () => {
//                     expect(() => {
//                         TVM.A.G(interestDecimal, n);
//                     }).toThrow("The number of periods 'n' cannot be Infinity.");
//                 });
//             } else {
//                 expectedOutput = -1 * ((1 / interestDecimal) - (n / (Math.pow(1 + interestDecimal, n) - 1)));
//                 it(`Tests uniformGradientSeries function with rate ${i}% and ${n} periods`, () => {
//                     expect(TVM.A.G(interestDecimal, n)).toBeCloseTo(expectedOutput);
//                 });
//             }
//         });
//     });
// });

// describe('Testing Geometric Series Present Value (P/C,i,g,n)', () => {
//     is.forEach(i => {
//         gs.forEach(g => {
//             ns.forEach(n => {
//                 const interestDecimal = findPercentage(i);
//                 const growthDecimal = findPercentage(g);
//                 var expectedOutput;

//                 it(`Tests geometricSeriesPresentValue function with rate ${i}% and growth ${g}% over ${n} periods`, () => {
//                     if (interestDecimal > growthDecimal && n === Infinity) {
//                         expectedOutput = -1 * (1 / (interestDecimal - growthDecimal));
//                     } else if (interestDecimal === growthDecimal) {
//                         expectedOutput = -1 * (n / (1 + growthDecimal));
//                     } else {
//                         expectedOutput = -1 * ((1 - Math.pow((1 + growthDecimal) / (1 + interestDecimal), n)) / (interestDecimal - growthDecimal));
//                     }
//                     expect(TVM.P.C(interestDecimal, growthDecimal, n)).toBeCloseTo(expectedOutput);
//                 });
//             });
//         });
//     });
// });


// in terminal execute npm test
