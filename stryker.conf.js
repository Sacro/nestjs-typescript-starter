/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable unicorn/prevent-abbreviations */

module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['clear-text', 'progress', 'html'],
    testRunner: 'jest',
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    files: ['src/**/*.ts', '!src/**/index.ts', 'test/**/*.ts'],
    mutate: [
      '{src,lib}/**/*.ts?(x)',
      '!{src,lib}/**/__tests__/**/*.ts?(x)',
      '!{src,lib}/**/?(*.)+(spec|test).ts?(x)',
      '!{src,lib}/**/*+(Spec|Test).ts?(x)',
    ],
    jest: {
      config: require('./package.json').jest,
    },
  });
};
