const nextJest = require("next/jest");

const oldJest = {
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "**/*.{js,jsx,ts,tsx}",
  //   "!studio/**",
  //   "!**/*.d.ts",
  //   "!**/schema/**",
  //   "!**/node_modules/**",
  //   "!.next/**",
  // ],
  verbose: true,
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/components/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
    "^@services/(.*)$": "<rootDir>/services/$1",
    "^hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^lib/(.*)$": "<rootDir>/lib/$1",
    "^pages/(.*)$": "<rootDir>/pages/$1",
    "^PageBuilder/(.*)$": "<rootDir>/PageBuilder/$1",

    /* Handle CSS imports (with CSS modules)
      https://jestjs.io/docs/webpack#mocking-css-modules */
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    /* Handle image imports
      https://jestjs.io/docs/webpack#handling-static-assets */
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/studio/",
    "testPrepare.ts",
  ],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["cypress"],

  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

module.exports = createJestConfig(oldJest);
