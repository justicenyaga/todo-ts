import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
    plugins: {
      prettier,
    },
    rules: {
      ...prettierConfig.rules,
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

