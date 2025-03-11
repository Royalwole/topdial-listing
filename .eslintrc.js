export default {
  plugins: ['@next/next', '@typescript-eslint'],
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    "next/core-web-vitals"
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
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      'ignoreRestSiblings': true, 
      'argsIgnorePattern': '^_', 
      'varsIgnorePattern': 'ClerkProvider' 
    }]
  },
  globals: {
    process: 'readonly',
    console: 'readonly'
  }
};
