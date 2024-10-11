import globals from "globals";
import plugin from "@eslint/js";
import eslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  plugin.configs.recommended,
  ...eslint.configs.recommended,
];
