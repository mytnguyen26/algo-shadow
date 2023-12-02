// Common.test.js
import Common from "../src/pages/Algorithm/Common/Common";

describe('Common Module Tests', () => {
  it('validates data correctly', () => {
    const testData = "1,2,3";
    const result = Common.validdata(testData);
    expect(result).toEqual(["1", "2", "3"]);
  });

  it('validates single data correctly', () => {
    const testValue = "1";
    const result = Common.validonedata(testValue);
    expect(result).toBe("1");
  });

  // ... other tests for Common methods
});