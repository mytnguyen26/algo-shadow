import '@testing-library/jest-dom';
jest.mock('d3', () => ({
    select: jest.fn().mockReturnThis(), // 链式调用
    scaleLinear: jest.fn().mockReturnThis(), // 如果你使用了scaleLinear
    axisBottom: jest.fn().mockReturnThis(), // 如果你使用了axisBottom
    axisLeft: jest.fn().mockReturnThis(),
  }));