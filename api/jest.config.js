module.exports = {
    testEnvironment: "node",
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/controllers/*"
    ],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
  