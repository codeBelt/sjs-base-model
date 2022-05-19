// https://nextjs.org/docs/basic-features/eslint
// https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

module.exports = {
  plugins: ['typescript-sort-keys', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
    // Make sure this is always the last configuration in the extends array.
    'prettier',
  ],
  rules: {
    // 0 = off, 1 = warn, 2 = error
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-shadow': 2,
    'array-bracket-spacing': [2, 'never'],
    'no-return-await': 2,
    'id-length': ['error', { exceptions: ['_', 'x', 'y', 'a', 'b'] }],
    curly: 2,
    'eol-last': 2,
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'import/no-cycle': [0, { maxDepth: 1 }],
    'no-console': [2, { allow: ['warn', 'error', 'info', 'groupCollapsed', 'group', 'groupEnd'] }],
    'no-const-assign': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-global-assign': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-assign': 2,
    'no-multi-str': 2,
    'no-trailing-spaces': 2,
    'no-unreachable': 2,
    'no-var': 2,
    'no-whitespace-before-property': 2,
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, 'never'],
    'padded-blocks': [2, 'never'],
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'return' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'never', prev: '*', next: 'case' },
    ],
    'prefer-const': 2,
    'prefer-template': 2,
    'react/prop-types': 0,
    'space-before-blocks': [2, 'always'],
    'newline-after-var': [2, 'always'],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-infix-ops': 2,
    'space-in-parens': [2, 'never'],
    'template-curly-spacing': [2, 'never'],
    'spaced-comment': [
      2,
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-'],
        },
        block: {
          markers: ['/', '*'],
        },
      },
    ],
    'no-param-reassign': [2, { props: false }],
    'dot-notation': [2, { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
    quotes: [2, 'single', { avoidEscape: true }],
    'unused-imports/no-unused-imports': 2,
  },
  overrides: [
    {
      files: ['./**/*.test.ts'],
      rules: {
        'dot-notation': 'off',
      },
    },
  ],
};
