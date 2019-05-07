process.env.NODE_ENV = 'test';

module.exports = function() {
  return {
    env: {
      runner: 'node',
      type: 'node',
    },
    files: [
      'sample.env',
      'tsconfig.json',
      'package.json',
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'src/main.ts', ignore: true },
      { pattern: 'src/**/app.module.ts', ignore: true },
      { pattern: 'src/**/*.json', ignore: true },
      { pattern: 'src/**/*.spec.ts', ignore: true },
    ],
    reportConsoleErrorAsError: true,
    setup: function(wallaby) {
      var jestConfig = require('./package.json').jest;
      // for example:
      // jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    },
    testFramework: 'jest',
    tests: [{ pattern: 'src/**/*spec.ts' }],
  };
};
