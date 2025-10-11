module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  testMatch: ['<rootDir>/src/**/*.test.[tj]sx']
}
