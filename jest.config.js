/** @type {import('jest').Config} */
const config = {
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  setupFiles: ['jest-webextension-mock', './tests_setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/app/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/chrome/extension/?(*.)(spec|test).js?(x)',
  ],
  collectCoverageFrom: ['app/**/*.{js,jsx}', 'chrome/extension/*.{js,jsx}'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^config$': '<rootDir>/config/test.js',
  },
}

module.exports = config
