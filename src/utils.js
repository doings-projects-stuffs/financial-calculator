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
    return (...args) => -1 * inputFunction(...args);
}

/**
 * Compute the sum of natural numbers up to `n`
 * @param {number} n
 * @returns
 */
export function sumOfNaturalNumbers(n) {
    return n * (n + 1) / 2
}

/**
 * Newton-Raphson method based on https://en.wikipedia.org/wiki/Newton%27s_method#Code
 * @template {(x: number) => number} Fn
 * @param {number} x0 The initial guess
 * @param {Fn} f The function whose root we are trying to find
 * @param {Fn} f_prime The derivative of the function
 * @param {number} tolerance Stop when iterations change by less than this
 * @param {number} epsilon Do not divide by a number smaller than this
 * @param {number} max_iterations The maximum number of iterations to compute
 */
export function newtown_raphson_method(x0, f, f_prime, tolerance, epsilon, max_iterations) {
    for (let iteration = 0; iteration < max_iterations; iteration++) {
        const y = f(x0)
        const y_prime = f_prime(x0)

        if (Math.abs(y_prime) < epsilon) {
            break
        }

        const x1 = x0 - (y / y_prime) * (1 - iteration / max_iterations)

        if (Math.abs(x1 - x0) <= tolerance) {
            return x1
        }

        x0 = x1
    }

    return null
}

/**
 * Compute the derivative of a function using the definition of a derivative
 * @template {(x: number) => number} Fn
 * @param {Fn} f
 * @param {number} delta_x
 * @returns {Fn}
 */
export function derivative(f, delta_x) {
    return (x) => (f(x + delta_x) - f(x)) / delta_x
}

/**
 * Compute the derivative of a tvm function using the definition of a derivative
 * @param {(i: number, n: number) => number} f
 * @param {number} n
 * @param {number} delta_x
 * @returns {(i: number) => number}
 */
export function tvm_derivative(f, n, delta_x) {
    return derivative((i) => f(i, n), delta_x)
}
