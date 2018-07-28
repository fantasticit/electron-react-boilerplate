module.exports = {
  verbose: true,
  testURL: 'http://localhost:8081',
  collectCoverage: true,
  moduleNameMapper: {
    // 需要mock的资源，这部分资源不影响代码逻辑，但是会影响jest加载资源
    '\\.(css|scss|less)$': 'identity-obj-proxy', // 样式文件处理
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).ts?(x)']
}
