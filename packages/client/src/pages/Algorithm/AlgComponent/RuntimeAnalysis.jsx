export const sendDataToServer = (algorithm, input, output, runtime) => {
    // Since there's no backend for now
    // console.log('Algorithm:', algorithm);
    // console.log('Input:', JSON.stringify(input));
    // console.log('Output:', JSON.stringify(output));
    // console.log('Runtime:', runtime, 'ms');
  };
  
  export const analyzeRuntime = (algorithm, input, func, ...args) => {
    const startTime = performance.now();
    
    const output = func(...args);
    
    const endTime = performance.now();
    const runtime = endTime - startTime;
    
    // Log the data to the console instead of sending it to a server
    sendDataToServer(algorithm, input, output, runtime);
  
    // Return the result of the function call
    return { input, output, runtime };
  };