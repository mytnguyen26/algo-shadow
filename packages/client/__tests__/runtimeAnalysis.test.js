import { AnalyzeRuntime } from '../src/pages/Algorithm/AlgComponent/runtimeAnalysis';

describe('AnalyzeRuntime', () => {
  const mockFunction = jest.fn().mockReturnValue('test output');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw error if func is not a function', () => {
    expect(() => AnalyzeRuntime('algorithm', 'input', 'notAFunction')).toThrow("Provided func is not a function");
  });

  test('should handle no explicit output', () => {
    const result = AnalyzeRuntime('algorithm', 'input', () => undefined);
    expect(result.output).toBe('No explicit output');
  });

  test('should calculate runtime correctly', () => {
    const result = AnalyzeRuntime('algorithm', 'input', mockFunction, 5);
    expect(typeof result.runtime).toBe('number');
    expect(result.runtime).toBeGreaterThanOrEqual(0);
  });

  test('should pass arguments to the function', () => {
    AnalyzeRuntime('algorithm', 'input', mockFunction, 1, 'arg1', 'arg2');
    expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
