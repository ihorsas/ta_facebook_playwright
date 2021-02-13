module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    testRunner: "jest-circus/runner",
    testEnvironment: "./playwright_environment.js",
    testTimeout: 10000
}