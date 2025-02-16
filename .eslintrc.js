module.exports = {
  plugins: ['@next/next', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },

  globals: {
    process: 'readonly',
    console: 'readonly'
  }

};
