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
        { n: Infinity, i: 0, expected: NaN },
        { n: Infinity, i: 50, expected: -Infinity },
    ])('n=$n, i=$i, P_simple($i, $n)=$expected', ({ n, i, expected }) => {
        expect(TVM.F.P_simple(findPercentage(i), n)).toBeCloseTo(expected);
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
        ])('(F/P,$i,$n)=1/(P/F,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.F.P(findPercentage(i), n)).toBeCloseTo(value);
            expect(1 / TVM.P.F(findPercentage(i), n)).toBeCloseTo(value);
        }))
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
        ])('(P/A,$i,$n)=1/(A/P,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.P.A(findPercentage(i), n)).toBeCloseTo(value);
            expect(1 / TVM.A.P(findPercentage(i), n)).toBeCloseTo(value);
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
        ])('(F/A,$i,$n)=1/(A/F,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.F.A(findPercentage(i), n)).toBeCloseTo(value);
            expect(1 / TVM.A.F(findPercentage(i), n)).toBeCloseTo(value);
        }))
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
        ])('(A/G,$i,$n)=$value', (({ n, i, value }) => {
            expect(TVM.A.G(findPercentage(i), n)).toBeCloseTo(value);
        }))
    })

    describe('Testing (P/C,i,g,n)', () => {
        test.each([
            { n: 1, i: 50, g: 0, value: 0 },
            { n: 1, i: 100, g: 0, value: 0 },
            { n: 2, i: 50, g: 0, value: -0.3999999999999999 },
            { n: 2, i: 100, g: 0, value: -0.33333333333333337 },
            { n: 3, i: 50, g: 0, value: -0.736842105263158 },
            { n: 3, i: 100, g: 0, value: -0.5714285714285714 },
        ])('(P/C,$i,$g,$n)=$value', (({ n, i, value }) => {
            expect(TVM.A.G(findPercentage(i), n)).toBeCloseTo(value);
        }))
    })
})


// in terminal execute npm test
