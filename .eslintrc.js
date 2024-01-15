module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["jsx-a11y", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest"
  },
  "env": {
    "node": true,
    "es6": true
  },
  overrides: [
    {
      files: ["*.test.js", "__mocks__/**"],
      env: {
        jest: true,
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      extends: [
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended"
      ],
      rules: {
        semi: 0,
        "prettier/prettier": ["error", { "semi": false }]
      }
    },
  ],
  rules: {
    'react/prop-types': 'off',
  },
  "globals": {
    "pbjs": "readonly"
  }
}
