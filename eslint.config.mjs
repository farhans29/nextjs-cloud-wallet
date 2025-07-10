import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off", // Turn off the base rule to avoid incorrect errors
    },
  },
];

export default eslintConfig;
