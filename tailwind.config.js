/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9B5DE5",
        secondary: "#F4A261",
        accent: "#2A9D8F",
        "background-light": "#F9F9F9",
        "background-dark": "#171717",
        "card-light": "#FFFFFF",
        "card-dark": "#2C2C54",
        "text-primary": "#1D1D1D",
        "text-secondary": "#5C5C5C",
        "text-accent": "#9B5DE5",
        success: "#2A9D8F",
        warning: "#F4A261",
        error: "#FF5A5F",
        info: "#4CC9F0",
        "neutral-light": "#E0E0E0",
        "neutral-dark": "#6C757D",
        highlight: "#D4A5FF",
        link: "#6A4C93",
      },
    },
  },
  plugins: [],
};
