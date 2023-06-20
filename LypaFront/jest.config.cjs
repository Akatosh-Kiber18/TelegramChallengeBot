module.exports = {
    roots: ['./tests'],
    testEnvironment: 'jsdom',
    testRunner: 'jest-circus/runner',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
  };
  