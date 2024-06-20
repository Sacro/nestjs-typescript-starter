// @ts-check

import eslint from '@eslint/js';
import eslintPluginTypescript from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default eslintPluginTypescript.config(
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: ['**/build/**', '**/dist/**', 'src/some/file/to/ignore.ts'],
  },
  eslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': eslintPluginTypescript.plugin,
    },
    languageOptions: {
      parser: eslintPluginTypescript.parser,
      parserOptions: {
        project: true,
      },
    },
  },
  eslintPluginJest.configs['flat/recommended'],
  // @ts-expect-error
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
);
