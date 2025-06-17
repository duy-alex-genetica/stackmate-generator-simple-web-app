import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "airbnb",
      "prettier",
      "next/typescript",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    rules: {
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["state", "acc"],
        },
      ],
      "no-await-in-loop": 0,
      "import/no-extraneous-dependencies": "warn",
      "react/no-array-index-key": 0,
      "no-alert": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      "import/extensions": "off",
      "react/jsx-filename-extension": [0, { "extensions": [".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": [
        0,
        { "html": "ignore", "custom": "ignore", "explicitSpread": "ignore" },
      ],
      "react/jsx-no-useless-fragment": "off",
      "react/button-has-type": "off",
      "no-use-before-define": 0,
      "consistent-return": "warn",
      "no-console": 0,
      "no-unused-vars": "warn",
      "import/newline-after-import": "warn",
      "import/order": 0,
      "react-hooks/exhaustive-deps": "warn",
      "react/require-default-props": 0,
      "@typescript-eslint/no-explicit-any": 0,
    },
    ignorePatterns: ["node_modules/", "build/", ".next/", ".eslintrc.mjs", "public/assets/"],
  }),
];

export default eslintConfig;
