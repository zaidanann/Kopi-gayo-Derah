import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#fdf6f0",
          100: "#fae8d8",
          200: "#f5ceb0",
          300: "#eeac80",
          400: "#e5854e",
          500: "#de6530",
          600: "#cf4e25",
          700: "#ac3b21",
          800: "#893122",
          900: "#6f2a1e",
          950: "#3c130d",
        },
        cream: {
          50: "#fefdf8",
          100: "#fdf9ec",
          200: "#faf0ce",
          300: "#f5e3a0",
          400: "#eecf6a",
          500: "#e5b93d",
          600: "#d49e28",
          700: "#b07f20",
          800: "#8f641f",
          900: "#76521e",
          950: "#42290c",
        },
        espresso: "#1a0a00",
        latte: "#c8a97a",
        mocha: "#6f4e37",
        foam: "#f5f0e8",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        accent: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
      backgroundImage: {
        "coffee-gradient": "linear-gradient(135deg, #1a0a00 0%, #6f4e37 50%, #c8a97a 100%)",
        "cream-gradient": "linear-gradient(180deg, #fdf6f0 0%, #f5e3a0 100%)",
        "dark-coffee": "linear-gradient(135deg, #0d0500 0%, #1a0a00 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-right": "slideRight 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "steam-1": "steam1 3s ease-in-out infinite",
        "steam-2": "steam2 3s ease-in-out infinite 1s",
        "steam-3": "steam3 3s ease-in-out infinite 2s",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        steam1: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0.8" },
          "50%": { transform: "translateY(-20px) scaleX(1.3)", opacity: "0.5" },
          "100%": { transform: "translateY(-40px) scaleX(0.8)", opacity: "0" },
        },
        steam2: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-25px) scaleX(0.8)", opacity: "0.3" },
          "100%": { transform: "translateY(-50px) scaleX(1.2)", opacity: "0" },
        },
        steam3: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0.7" },
          "50%": { transform: "translateY(-15px) scaleX(1.1)", opacity: "0.4" },
          "100%": { transform: "translateY(-35px) scaleX(0.9)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
