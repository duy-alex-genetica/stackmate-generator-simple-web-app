/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin')

const safelist = new Array(50).fill("").map((i, index) => `z-[${index}]`);

module.exports = {
  darkMode: ["class", "class"],
  content: [
    "./features/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss,sass}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/tailwindcss-react-select/dist/index.esm.js",
  ],
  safelist,
  theme: {
    squareSize:  Array.from({ length: 20 }, (_, i) => i + 1).reduce((acc, size) => {
      acc[size] = {
        width: `${size * 0.25}rem`,
        height: `${size * 0.25}rem`,
      };
      return acc;
    }, {}),
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
      },
      fontFamily: {
        afacad: ['Afacad', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        1: "0 1px 2px rgba(56,65,74,.15)",
        2: "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
        3: "0 0 0 1px #2684FF",
      },
      colors: {
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          square: (value) => value,
        },
        { values: theme('squareSize') }
      )
    }),
    plugin(({ addUtilities, theme }) => {
      const newUtilities = {}
      Object.entries(theme('transitionDuration')).forEach(([key, value]) => {
        newUtilities[`.transition-${key}`] = {
          transition: `all ${value}`,
        }
      })
      addUtilities(newUtilities, ['responsive', 'hover'])
    }),
  ],
};
