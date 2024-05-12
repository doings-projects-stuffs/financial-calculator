/**
 *
 * @param {number} value
 * @returns percentage equivalent of the input value
 */
export function findPercentage(value) {
    return value / 100;
}

/**
 * @template {(...args: any[]) => number} Fn
 * @param {Fn} inputFunction
 * @returns {Fn}
 */
export function negate(inputFunction) {
    return (...args) => -1 * inputFunction(...args)
}

/**
 * Compute the sum of natural numbers up to `n`
 * @param {number} n 
 * @returns 
 */
export function sumOfNaturalNumbers(n) {
    return n * (n + 1) / 2
}