module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style" : 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "import/no-extraneous-dependencies": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "no-nested-ternary": 0,
    "consistent-return": 0,
    "react/no-unused-state": 0,
    "object-curly-newline": 0,
    "max-len": 0,
    "no-param-reassign": 0,
  },
};
