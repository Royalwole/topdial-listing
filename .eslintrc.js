module.exports = {
  plugins: ['@next/next'],
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  rules: {
    'no-unused-vars': 'off'
  }
};
