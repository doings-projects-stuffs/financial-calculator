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