// @ts-check

import eslint from "@eslint/js"
import eslintPluginTypescript from 'typescript-eslint'
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default eslintPluginTypescript.config({
  files: ['** /*.ts'],
  extends: [
    eslint.configs.recommended,
    ...eslintPluginTypescript.configs.strict,
    eslintPluginUnicorn.configs['flat/recommended'],
    eslintPluginJest.configs.recommended,
    eslintPluginPrettier.configs.recommended,
  ],
  rules: [],
  ignores: [
    "coverage",
    "dist",
    "node_modules",
  ],
})
