// https://github.com/kulshekhar/ts-jest

module.exports = {
    verbose: false,
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    collectCoverageFrom: ['src/**/*.ts'],
};
