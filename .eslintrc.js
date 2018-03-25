module.exports = {
  "extends": "airbnb",
  "plugins": ["eslint-plugin-import"],
  "rules": {
    "import/no-default-export": "error",
    "import/prefer-default-export": 0,
    "import/order": ["error", {"newlines-between": "always"}]
  }
};
