module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  // 配置测试脚本匹配规则
  // testMatch: ['**/tests/unit/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
