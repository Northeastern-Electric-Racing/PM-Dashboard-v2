module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  rootDir: '.',
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx', 'mjs', 'cjs', 'node'],
  moduleNameMapper: {
    '^@@app(.*)$': '<rootDir>/src/frontend/app$1',
    '^@@components(.*)$': '<rootDir>/src/frontend/components$1',
    '^@@layouts(.*)$': '<rootDir>/src/frontend/layouts$1',
    '^@@pages(.*)$': '<rootDir>/src/frontend/pages$1',
    '^backend(.*)$': '<rootDir>/src/backend$1',
    '^test-support(.*)$': '<rootDir>/src/test-support$1',
    '^shared(.*)$': '<rootDir>/src/shared$1',
  },
  coverageReporters: [
    'text',
    'html'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/.github/',
    '!<rootDir>/build/',
    '!<rootDir>/coverage/',
    '!<rootDir>/docs/',
    '!<rootDir>/lambda/',
    '!<rootDir>/public/',
    '!<rootDir>/src/backend/prisma/',
    '!<rootDir>/src/utils/lib',
    '!<rootDir>/src/utils/node_modules/',
    '!**/lib/**',
    '!src/**/*.d.ts'
  ]
};