const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/', // ! means to not collect coverage from files/folders at this path
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
  ],
  coverageReporters: [
    'text',
    'html'
  ],
  globals: {
    'ts-jest': {
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    },
  },
  moduleFileExtensions: ['tsx', 'ts', 'json', 'js', 'jsx', 'mjs', 'cjs', 'node'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  moduleNameMapper: {
    '@@app(.*)$': '<rootDir>/src/frontend/app/$1',
    '@@components(.*)$': '<rootDir>/src/frontend/components/$1',
    '@@layouts(.*)$': '<rootDir>/src/frontend/layouts/$1',
    '@@pages(.*)$': '<rootDir>/src/frontend/pages/$1',
    '@@backend(.*)$': '<rootDir>/src/backend/$1',
    '@@test-support(.*)$': '<rootDir>/src/test-support/$1',
    '@@shared(.*)$': '<rootDir>/src/shared/$1',
    // stubbing assets for tests
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  preset: 'ts-jest',
  rootDir: '.',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/src/utils/lib/types'],
  verbose: true,
  
};