// import { findPercentage } from './utils.js';

const TVM = require('./tvm');  // Ensure this path is correct

test('Tests compoundAmount function with rate 0.1 and 2 periods', () => {
  expect(TVM.F.P(0.1, 2)).toBeCloseTo(1.21);
});

test('Tests presentValueAmount function with rate 0.1 and 2 periods', () => {
  expect(TVM.P.F(0.1, 2)).toBeCloseTo(1 / 1.21);
});
