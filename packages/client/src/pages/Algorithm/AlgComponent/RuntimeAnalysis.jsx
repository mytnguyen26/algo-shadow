export const AnalyzeRuntime = (algorithm, input, func, iterations = 10, ...args) => {
  if (typeof func !== 'function') {
    throw new Error('Provided func is not a function');
  }

  let totalTime = 0;
  let output = func(...args); // Execute the function once outside the loop
  if (output === undefined) {
    output = 'No explicit output'; // Or any other default value
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
