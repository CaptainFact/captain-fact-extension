module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
  },
  globals: {
    module: 'readonly',
    CF_VERSION: 'readonly',
    chrome: 'readonly',
  },
  overrides: [
    {
      files: ['*.spec.js'],
      globals: {
        test: 'readonly',
        snapshot: 'readonly',
        snapshotComponent: 'readonly',
        shallow: 'readonly',
        tMock: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
      },
    },
  ],
}
