/* eslint-disable no-unused-vars */
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import babelParser from '@babel/eslint-parser';

export default [
  js.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      }
    }
  }
];
