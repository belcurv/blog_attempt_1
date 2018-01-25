// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
      // 4 spaces
      'indent': ['error', 4],
      // allow multi spaces
      'no-multi-spaces': ['error', {
          'exceptions': {
              'Property': true,
              'ImportDeclaration': true,
              'VariableDeclarator': true
          }}
      ],
      'key-spacing': ['error', {
          'align': {
              'beforeColon': true,
              'afterColon': true,
              'on': 'colon'
          }
      }],
      'comma-dangle': ['error', {
          'arrays': 'never',
          'objects': 'never',
          'imports': 'never',
          'exports': 'never',
          'functions': 'ignore'
      }],
      'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
      // disallow reassignment of function parameters
      // disallow parameter object manipulation except for specific exclusions
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ]
      }],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
