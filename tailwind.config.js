const plugin = require("tailwindcss/plugin");
const em = (px, base) => `${round(px / base)}em`;
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./PageBuilder/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ["var(--font-montserrat)"],
      header: ["var(--gt-zirkon)"],
    },
    fontSize: {
      sm: ["12px", "1em"],
      base: ["16px", "1.77"],
      lg: ["18px", "1.7"],
      xl: ["20px", "1.5em"],
      "2xl": [em(20, 16), { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      "3xl": [em(28, 16), { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      "4xl": [em(38, 16), { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      "5xl": [em(48, 16), { lineHeight: "1.1", letterSpacing: "-0.03em" }],
    },

    extend: {
      borderRadius: {
        theme: "24px",
      },
      boxShadow: {
        theme:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },

      colors: {
        grey: {
          light: "#f1f1f1",
          DEFAULT: "#c4c4c4",
          dark: "#dddddd",
          border: "#6b7280",
        },

        black: "#000000",
        white: "#ffffff",
        primary: { light: "#F9DE83", xLight: "#FCF6D8", DEFAULT: "#F3BD06" },
        font: { dark: "#1D1D1B", DEFAULT: "#3C3C3B" },
        secondary: { DEFAULT: "#D22D30", light: "#EC4E51" },
        red: "#D22D30",
      },
      animation: {
        pageFadeIn: "fadeIn 0.6s ease-in forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeInFast: "slideDown 0.25s ease-in forwards",
        fadeInMenuItemFast: "menuFade 0.25s ease-in forwards",
        slideDown: "slideDown 0.25s ease-in forwards",
        slideInRight: "slideInRight 0.5s ease-in forwards",
        slideDownOut: "slideDownOut 0.5s ease-in forwards",

        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
        accordion_open: "accordion_open 250ms ease",
        accordion_close: "accordion_close 250ms ease",
      },
      keyframes: {
        accordion_open: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordion_close: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        menuFade: {
          "0%": {
            opacity: 0,
            transform: " translateX(-50%)   translateY(-100%)",
            zIndex: -100,
          },
          "99%": {
            zIndex: -100,
          },
          "100%": {
            zIndex: 20,
            opacity: 1,
            transform: " translateX(-50%) ",
          },
        },
        enterFromRight: {
          from: { opacity: 0, transform: "translateX(200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: "translateX(-200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: 0, transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
          to: { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideDownOut: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { transform: "translateY(100%)", opacity: 0 },
        },
        slideDownIn: {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "100%": { transform: "translateY(100%)", opacity: 0 },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-multi-column")(),
    plugin(function ({ addComponents, theme }) {
      const buttons = {
        ".btn": {
          padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
          fontWeight: theme("fontWeight.600"),

          color: theme("colors.black"),
          "&:hover": {
            backgroundColor: theme("colors.black"),
            color: theme("colors.white"),
          },
        },
      };

      addComponents(buttons);
    }),
  ],
};
