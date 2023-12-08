const path = require('path');

module.exports = {
  root: true,
  extends: ['vinta/recommended'],
  rules: {
    "default-param-last": "off",
<<<<<<< HEAD
    "@babel/camelcase": "off"
=======
>>>>>>> b8f188b (增加PIR相关应用)
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, '/webpack.local.config.js'),
        'config-index': 1
      }
    },
    react: {
      "version": "detect"
    },
  }
}
