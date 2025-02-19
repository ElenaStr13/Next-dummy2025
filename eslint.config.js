import next from "eslint-plugin-next";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.Config} */
export default [
    {
        ignores: ["node_modules/", "dist/", ".next/", "out/"]
    },
    {
        languageOptions: {
            parser: tsParser,
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json"
            }
        },
        plugins: { "@typescript-eslint": ts, next },
        rules: {
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-unused-vars": "warn"
        }
    }
];
