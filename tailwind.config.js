const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./privateModules/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ["Montserrat", "Helvetica", "sans-serif"],
      hand: ["Caveat"],
    },
    fontSize: {
      sm: ["12px", "1em"],
      base: ["16px", "1.5em"],
      lg: ["20px", "1.5em"],
      xl: ["20px", "1.5em"],
      "2xl": ["22px", "1.5em"],
      "3xl": ["30px", "1.5em"],
      "4xl": ["40px", "1.5em"],
      "5xl": ["50px", "1.5em"],
    },

    extend: {
      borderRadius: {
        theme: "24px",
      },
      colors: {
        grey: {
          light: "#dddddd",
          DEFAULT: "#d1d5db",
          dark: "#dddddd",
        },
        black: "#595959",
        white: "#ffffff",
        primary: { light: "#FDECB3", DEFAULT: "#FCDE84" },
        secondary: "#CDD3C5",
        red: "#D22D30",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeInFast: "slideDown 0.25s ease-in forwards",
        fadeInMenuItemFast: "menuFade 0.25s ease-in forwards",
        slideDown: "slideDown 0.25s ease-in forwards",
        slideInRight: "slideInRight 0.5s ease-in forwards",
      },
      keyframes: {
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
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
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
