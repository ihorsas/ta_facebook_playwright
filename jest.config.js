module.exports = {
    preset: "jest-playwright-preset",
    testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
    testRunner : 'jasmine2',
    testTimeout: 70000,
    reporters: ['default', 'jest-allure'],
    setupFilesAfterEnv: ['jest-allure/dist/setup']
};