module.exports = {
  plugins: ['@next/next'],
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
    'next'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['next/babel']
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-unused-vars': 'off'
  }
};
