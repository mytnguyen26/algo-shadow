import '@testing-library/jest-dom';
jest.mock('d3', () => ({
    select: jest.fn().mockReturnThis(),
    scaleLinear: jest.fn().mockReturnThis(), 
    axisBottom: jest.fn().mockReturnThis(),
    axisLeft: jest.fn().mockReturnThis(),
  }));