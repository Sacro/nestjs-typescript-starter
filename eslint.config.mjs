// @ts-check

import eslint from '@eslint/js';
import eslintPluginTypescript from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginVitest from 'eslint-plugin-vitest';
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
  eslintPluginVitest.configs.recommended,
  // @ts-expect-error
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
);
