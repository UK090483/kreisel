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
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@services/(.*)$": "<rootDir>/services/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^pages/(.*)$": "<rootDir>/pages/$1",

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
  modulePathIgnorePatterns: ['cypress'],

  // transform: {
  //   // /* Use babel-jest to transpile tests with the next/babel preset
  //   //   https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
  //   "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  // },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "^.+\\.module\\.(css|sass|scss)$",
  // ],
};

const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

module.exports = createJestConfig(oldJest);
