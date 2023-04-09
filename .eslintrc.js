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
  },
  overrides: [
    {
      files: ['*.spec.js'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
  ],
}
