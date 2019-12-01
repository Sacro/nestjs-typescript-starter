/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable unicorn/prevent-abbreviations */

module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: ['typescript'],
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    files: ['src/**/**.spec.ts'],
    mutate: ['src/**/**.spec.ts'],
  });
};
