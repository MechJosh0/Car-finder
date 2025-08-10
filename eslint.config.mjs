import js from "@eslint/js";
import globals from "globals";
import vueEslint from "eslint-plugin-vue";
import tailwindcssEslint from "eslint-plugin-tailwindcss";
import prettierConfig from "eslint-config-prettier";
import typescriptEslint from "typescript-eslint";

/** @type {impor('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "*.d.ts",
      "node_modules/",
      ".nuxt/",
      "public/",
      ".vscode/",
      ".idea/",
    ],
  },
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...tailwindcssEslint.configs["flat/recommended"],
  ...vueEslint.configs["flat/vue2-recommended"],
  prettierConfig,
  {
    rules: {
      "vue/multi-word-component-names": "off",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
  },
];
