// eslint-disable-next-line unicorn/prevent-abbreviations
const wallabyConfig = () => {
  return {
    autodetect: true,

    // modify `files` automatic configuration settings
    files: {
      override: (filePatterns) => {
        // TODO: modify `filePatterns` array as required
        return filePatterns;
      },
    },

    // modify `tests` automatic configuration settings
    tests: {
      override: (testPatterns) => {
        // TODO: modify `testPatterns` array as required
        return testPatterns;
      },
    },
    // env: {
    //   runner: 'node',
    //   type: 'node',
    // },
    // files: [
    //   'sample.env',
    //   'tsconfig.json',
    //   'package.json',
    //   { pattern: 'src/**/*.ts', load: false },
    //   { pattern: 'src/main.ts', ignore: true },
    //   { pattern: 'src/**/app.module.ts', ignore: true },
    //   { pattern: 'src/**/*.json', ignore: true },
    //   { pattern: 'src/**/*.spec.ts', ignore: true },
    // ],
    // reportConsoleErrorAsError: true,
    // setup: function (wallaby) {
    //   // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
    //   let jestConfig = require('./package.json').jest;
    //   // for example:
    //   // jestConfig.globals = { "__DEV__": true };
    //   wallaby.testFramework.configure(jestConfig);
    // },
    // testFramework: 'jest',
    // tests: [{ pattern: 'src/**/*spec.ts' }],
  };
};

export default wallabyConfig;
