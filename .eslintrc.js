module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  globals: {
    dayjs: true,
    _: true,
    config: true,
    JsonReParse: true,
    JsonSerialize: true,
    JsonParse: true,
  },
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 0,
    quotes: [2, 'single', 'avoid-escape'],
  },
};
