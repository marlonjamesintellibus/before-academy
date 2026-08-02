import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "src/db/migrations/**"]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  // Import layering (engineering/repository.md): app → features → lib.
  {
    files: ["src/lib/**/*.{ts,tsx}", "src/db/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@/app/*"],
              message: "lib/db/components must not import from features or app.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@/app/*"], message: "features must not import from app." },
            {
              group: ["@/features/*/*", "!@/features/*/index"],
              message: "Cross-feature imports go through the feature's index.ts only.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
