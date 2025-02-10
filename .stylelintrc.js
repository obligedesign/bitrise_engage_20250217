module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-html/vue',
    'stylelint-config-recommended-vue',
    // eslint-config-prettier-scssは必ず最後に記述しておくこと。
    // https://github.com/prettier/stylelint-config-prettier-scss#installation
    'stylelint-config-prettier-scss',
  ],
  customSyntax: 'postcss-scss',
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    // https://flex-box.net/stylelint-v14/ を参考にした
    'selector-id-pattern': null, // idでkebab-case以外も許容
    'selector-class-pattern': null, // classでkebab-case以外も許容
    'selector-type-no-unknown': null,
    'keyframes-name-pattern': null, // keyframesでkebab-case以外も許容
    'scss/at-mixin-pattern': null, // mixinでkebab-case以外も許容
    'scss/dollar-variable-pattern': null, // $変数でkebab-case以外も許容
    'scss/percent-placeholder-pattern': null, // %placeholderでkebab-case以外も許容
    'scss/at-extend-no-missing-placeholder': null, // @extendで%placeholder以外も許容
    'scss/at-function-pattern': null,
    'function-url-quotes': ['always', { severity: 'warning' }], // url()内が""で囲まれていなくてもwarningで止める
    'number-max-precision': null,
    'alpha-value-notation': null,
    'custom-property-no-missing-var-function': null,
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
        ignoreFunctions: ['convertPXtoVW', 'convertVH'],
      },
    ],
    'function-name-case': null,
    'function-no-unknown': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true, // @include, @mixin, @each, @extend, @function, @returnをエラー判定しない
      { ignoreAtRules: ['include', 'mixin', 'each', 'extend', 'function', 'return', 'use'] },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local'],
      },
    ],
    'no-descending-specificity': null,
    'color-function-notation': 'legacy',
    'color-hex-length': null,
    'block-no-empty': null,
    'font-family-name-quotes': ['always-where-recommended', { severity: 'warning' }], // font-family名のルールが適合していなくてもwarningで止める
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }],
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  ignoreFiles: [],
}
