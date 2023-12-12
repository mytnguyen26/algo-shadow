/**
 * Calculate the actual run time of an operation, such as search, insert, or delete
 * in BST or Heap, or find shortest path for Dijkstra
 * @param {str} algorithm is the algorithm + operation name, such as createBST
 * @param {*} input is the input to the function
 * @param {*} func a callable, which is an operation passed from the page, such as search(),
 * or delete()
 * @param  {...any} args 
 * @returns 
 */
export const AnalyzeRuntime = (algorithm, input, func, ...args) => {
  let totalTime = 0;
  const iterations = 10; // Repeat the operation 1000 times
  let output;

  for (let i = 0; i < iterations; i++) {
    const startTime = performance.now();
    output = func(...args); // Execute the function being tested
    const endTime = performance.now();
    totalTime += endTime - startTime;
  }

  const averageTime = totalTime / iterations;

  return { input, output, runtime: averageTime };
};
