module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup-file.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/__tests__/application/di',
    '<rootDir>/__tests__/infrastructure/http',
    '<rootDir>/__tests__/infrastructure/service/post/postServiceApiTestImpl.ts',
  ],
};
