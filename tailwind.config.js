/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, e, theme }) {
      const newUtils = {
        ".scrollbar-gutter-auto": {
          "scrollbar-gutter": "auto",
        },
        ".scrollbar-gutter-stable": {
          "scrollbar-gutter": "stable",
        },
        ".scrollbar-gutter-both": {
          "scrollbar-gutter": "both-edges",
        },
        ".cards-grid": {
          display: "grid",
          "grid-template-columns": "repeat(auto-fill, minmax(390px, 1fr))",
          gap: "1rem",
        },
        ".place-items-unset": {
          "place-items": "unset",
        },
        ".items-unset": {
          "align-items": "unset",
        },
        ".justify-unset": {
          "justify-content": "unset",
        },
      };

      addUtilities(newUtils, ["responsive", "hover"]);
    },
  ],
};
