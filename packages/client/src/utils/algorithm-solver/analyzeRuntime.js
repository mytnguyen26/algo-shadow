export const AnalyzeRuntime = (algorithm, input, func, ...args) => {
  let totalTime = 0;
  const iterations = 1; // Repeat the operation 1000 times
  let output;

  // for (let i = 0; i < iterations; i++) {
  const startTime = performance.now();
  output = func(input, ...args); // Execute the function being tested
  const endTime = performance.now();
  totalTime += endTime - startTime;
  //}

  const averageTime = totalTime / iterations;

  return { input, output, runtime: averageTime };
};
