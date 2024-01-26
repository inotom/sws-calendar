/** @prettier */

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  // Bug: ReferenceError: Vue is not defined for v2.0.0 #1525
  // https://github.com/vuejs/test-utils/issues/1525
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};
