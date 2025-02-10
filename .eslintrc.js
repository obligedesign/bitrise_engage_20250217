module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'semi-spacing': ['error', { after: true, before: false }],
    'semi-style': ['error', 'first'],
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-underscore-dangle': 'off',
    'no-constant-condition': ['error', { checkLoops: false }],
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-expressions': 'off',
    // '@typescript-eslint/no-unused-expressions': 'error',
    // Arrayは分割代入を強制しない
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'prefer-regex-literals': 'off',
    'default-param-last': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.d.tsx', '.vue'],
      },
    },
  },
}
