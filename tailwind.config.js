const plugin = require("tailwindcss/plugin");

module.exports = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
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
      colors: {
        grey: {
          light: "#f4f4f1",
          DEFAULT: "#ebebeb",
          dark: "#009eeb",
        },
        black: "#595959",
        white: "#ffffff",
        primary: "#F3BD06",
        secondary: "#D22D30",
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
        // ".svg-underline::after": {
        //   position: "relative",

        //   "&::after": {
        //     content: "",
        //     position: "absolute",
        //     bottom: "-0.125rem",
        //     left: "-0.5rem",
        //     right: " -0.5rem",
        //     height: "0.75rem",

        //     // Position the line behind the text so that
        //     // it is still easily readable
        //     "z-index": -1,

        //     // The SVG is added as an SVG background image
        //     "background-image": "url('/underline/underline.svg')",
        //     "background-repeat": "no-repeat",

        //     // This allows the SVG to flex in size to fit
        //     // any length of word. If the word is short,
        //     // the SVG will be stretched vertically, if it
        //     // is long, the SVG will be stretched horizontally.
        //     // The jagged nature of this particular SVG works
        //     // with this transforming.
        //     "background-size": "cover",
        //   },
        // },
      };

      addComponents(buttons);
    }),
  ],
};
