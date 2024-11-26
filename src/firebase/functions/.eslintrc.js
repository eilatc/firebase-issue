module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // TypeScript files
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        // TypeScript-specific rules
      },
    },
    {
      files: ["*.js"], // JavaScript files (like .eslintrc.js)
      env: {
        node: true,
      },
      extends: [
        "eslint:recommended",
      ],
      rules: {
        // JavaScript-specific rules
      },
    },
  ],
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
};
