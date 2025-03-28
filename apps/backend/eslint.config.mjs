import { createRequire } from "module";
const require = createRequire(import.meta.url);

import eslintPluginPrettier from "eslint-plugin-prettier";
import typescriptEsLint from "@typescript-eslint/eslint-plugin";
import { EndOfLineState } from "typescript";

const typescriptParser = require("@typescript-eslint/parser");
const espree = require("espree");

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEsLint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "crlf",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/no-empty-function": "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      parser: espree,
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    ignores: ["node_modules", "dist"],
  },
];
