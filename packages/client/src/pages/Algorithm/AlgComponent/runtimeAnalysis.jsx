/**
 * Analyzes and calculates the average runtime of a given function over a specified number of iterations.
 *
 * @param {string} algorithm - The name or description of the algorithm being tested.
 * @param {any} input - The input on which the algorithm is being tested.
 * @param {Function} func - The function that implements the algorithm.
 * @param {number} [iterations=10] - The number of times the function is executed to calculate the average runtime. Defaults to 10.
 * @param {...any} args - Additional arguments to pass to the function being tested.
 * @returns {{input: any, output: any, runtime: number}} An object containing the input, the output of the function, and the average runtime in milliseconds.
 * @throws {Error} If the provided 'func' is not a function.
 */

export const AnalyzeRuntime = (
  algorithm,
  input,
  func,
  iterations = 10,
  ...args
) => {
  if (typeof func !== "function") {
    throw new Error("Provided func is not a function");
  }

  let totalTime = 0;
  let output = func(...args); // Execute the function once outside the loop
  if (output === undefined) {
    output = "No explicit output"; // Or any other default value
  }

  for (let i = 0; i < iterations; i++) {
    const startTime = performance.now();
    func(...args); // Execute the function for time measurement
    const endTime = performance.now();
    totalTime += endTime - startTime;
  }

  const averageTime = totalTime / iterations;
  const roundedTime = Math.round(averageTime * 10000) / 10000;
  // console.log(roundedTime)
  return { input, output, runtime: roundedTime };
};
