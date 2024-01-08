module.exports = {
    "preset": "ts-jest/presets/js-with-ts",
    "transform": {
        "\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      '/node_modules/'
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy'
      },
    setupFiles: ['./esm-setup.js'],
    testEnvironment: 'jsdom'
  };
  