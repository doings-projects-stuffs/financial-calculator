import { describe, expect, it, test } from 'vitest';
import { TVM } from './tvm.js';
import { findPercentage } from './utils.js';

describe('Testing Simple Interest Rate', () => {
    test.each([
        { n: 0, i: 0, expected: -1 },
        { n: 0, i: 50, expected: -1 },
        { n: 1, i: 50, expected: -1.5 },
        { n: 1, i: 100, expected: -2 },
        { n: 2, i: 50, expected: -2 },
        { n: 2, i: 100, expected: -3 },
        { n: Infinity, i: 50, expected: -Infinity },
    ])('n=$n, i=$i, P_simple($i, $n)=$expected', ({ n, i, expected }) => {
        expect(TVM.F.P_simple(findPercentage(i), n)).toBeCloseTo(expected, 5);
    })
})

describe('Testing TVM Formulas: (F/P,i,n), (P/F,i,n), (F/A,i,n), (A/F,i,n), (P/A,i,n), (A/P,i,n)', () => {
    describe('Testing (F/P,i,n) and (P/F,i,n)', () => {
        test.each([
            { n: 0, i: 0, value: -1 },
            { n: 0, i: 50, value: -1 },
            { n: 0, i: Infinity, value: -1 },
            { n: 1, i: 0, value: -1 },
            { n: 1, i: 50, value: -1.5 },
            { n: 1, i: 100, value: -2 },
            { n: 2, i: 50, value: -2.25 },
            { n: 2, i: 100, value: -4 },
            { n: 13, i: 23, value: -14.74913 },
        ])('(F/P,$i,$n)=1/(P/F,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.F.P(findPercentage(i), n)).toBeCloseTo(value, 5);
            expect(1 / TVM.P.F(findPercentage(i), n)).toBeCloseTo(value, 5);
        }))
        test('(F/P,0,Infinity)=1/(P/F,0,Infinity)=NaN', () => {
            expect(TVM.F.P(0, Infinity)).toBe(NaN);
            expect(1/TVM.P.F(0, Infinity)).toBe(NaN);
        })

        test('(F/P,50,Infinity)=Infinity', () => {
            expect(TVM.F.P(0.5, Infinity)).toBe(-Infinity);
        })
        test('(F/P,Infinity,Infinity)=Infinity', () => {
            expect(TVM.F.P(Infinity, Infinity)).toBe(-Infinity);
        })
        test('(P/F,50,Infinity)=-0', () => {
            expect(TVM.P.F(0.5, Infinity)).toBe(-0);
        })
        test('(P/F,Infinity,Infinity)=-0', () => {
            expect(TVM.P.F(Infinity, Infinity)).toBe(-0);
        })
    })

    describe('Testing (P/A,i,n) and (A/P,i,n)', () => {
        // i = 0 leads to division by zero
        test.each([
            { n: 0, i: 50, value: 0 },
            { n: 0, i: Infinity, value: 0 },
            { n: 1, i: 50, value: -2 / 3 },
            { n: 1, i: 100, value: -0.5 },
            { n: 2, i: 50, value: -10 / 9 },
            { n: 2, i: 100, value: -0.75 },
            { n: 13, i: 23, value: -4.05304 },
            { n: Infinity, i: 23, value: -1/findPercentage(23) },
        ])('(P/A,$i,$n)=1/(A/P,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.P.A(findPercentage(i), n)).toBeCloseTo(value, 5);
            expect(1 / TVM.A.P(findPercentage(i), n)).toBeCloseTo(value, 5);
        }))
    })

    describe('Testing (F/A,i,n) and (A/F,i,n)', () => {
        // i = 0 leads to division by zero
        test.each([
            { n: 0, i: 50, value: 0 },
            { n: 0, i: Infinity, value: 0 },
            { n: 1, i: 50, value: -1 },
            { n: 1, i: 100, value: -1 },
            { n: 2, i: 50, value: -2.5 },
            { n: 2, i: 100, value: -3 },
            { n: 13, i: 23, value: -59.77883 },
        ])('(F/A,$i,$n)=1/(A/F,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.F.A(findPercentage(i), n)).toBeCloseTo(value, 5);
            expect(1 / TVM.A.F(findPercentage(i), n)).toBeCloseTo(value, 5);
        }))

        test('(F/A,50,Infinity)=Infinity', () => {
            expect(TVM.F.A(findPercentage(50), Infinity)).toBe(-Infinity)
        })
        test('(A/F,50,Infinity)=0', () => {
            expect(TVM.A.F(findPercentage(50), Infinity)).toBe(-0)
        })
    })

    describe('Testing (A/G,i,n)', () => {
        test.each([
            // n = 0 leads to division by zero
            { n: 1, i: 50, value: 0 },
            { n: 1, i: 100, value: 0 },
            { n: 2, i: 50, value: -0.3999999999999999 },
            { n: 2, i: 100, value: -0.33333333333333337 },
            { n: 3, i: 50, value: -0.736842105263158 },
            { n: 3, i: 100, value: -0.5714285714285714 },
            { n: 13,i: 23, value: -3.4023118217153705}
        ])('(A/G,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.A.G(findPercentage(i), n)).toBeCloseTo(value, 5);
        }))
    })

    // FIXME!!!
    describe('Testing (P/C,i,g,n)', () => {
        test.each([
            { n: 1, i: 50, g: 0, value: -0.6666666666666667 },
            { n: 1, i: 100, g: 10, value: -0.49999999999999994 },
            { n: 2, i: 50, g: 20, value: -1.2000000000000004 },
            { n: 2, i: 100, g: 30, value: -0.825 },
            { n: 3, i: 50, g: 40, value: -1.8696296296296326 },
            { n: 3, i: 100, g: 50, value: -1.15625 },
            { n: 13,i: 23, g: 60, value: -79.82345049344173}
        ])('(P/C,$i,$g,$n)=$value', (({ n, i, g, value }) => {
            expect(TVM.P.C(findPercentage(i), findPercentage(g), n)).toBeCloseTo(value, 5);
        }))

        test('(P/C,50%,25%,Infinity)=-1/(50% - 25%)', () => {
            expect(TVM.P.C(0.5, 0.25, Infinity)).toBeCloseTo(-1 / (0.5 - 0.25));
        })

        test('(P/C,50%,50%,13)=-13/(1 + 50%)', () => {
            expect(TVM.P.C(0.5, 0.5, 13)).toBeCloseTo(-13/(1 + 0.5));
        })
    })
})


// in terminal execute npm test
