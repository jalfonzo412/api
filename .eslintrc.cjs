module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', "plugin:prettier/recommended"],
  plugins: [
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prefer-promise-reject-errors': 'off',
    'prettier/prettier': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    eqeqeq: 'off',
    'func-names': 'off',
    'no-loop-func': 'off',
    'no-await-in-loop': 'off',
    'no-useless-escape': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'import/no-import-module-exports': 'off',
    camelcase: 'off',
    'max-len': 'off',
    'eol-last': 'off',
    quotes: 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off'
  },
};
