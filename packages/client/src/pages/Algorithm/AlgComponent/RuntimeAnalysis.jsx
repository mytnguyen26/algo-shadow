export const sendDataToServer = (algorithm, input, output, runtime) => {
    // Since there's no backend for now
    // console.log('Algorithm:', algorithm);
    // console.log('Input:', JSON.stringify(input));
    // console.log('Output:', JSON.stringify(output));
    // console.log('Runtime:', runtime, 'ms');
  };
  

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
  