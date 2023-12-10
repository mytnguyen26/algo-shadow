module.exports = {
    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    moduleNameMapper: {
      // If you have aliases in your Vite config, map them here
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
  };
  