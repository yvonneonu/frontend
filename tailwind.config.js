/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        cil: {
          red: "#FF000B",
          blue: "#5891CA",

          "tone-50": "#FAFAFA",
          "tone-100": "#EBEAEA",
          "tone-200": "#CECACA",
          "tone-300": "#B1AAAA",
          "tone-400": "#938A8A",
          "tone-500": "#756C6C",
          "tone-600": "#554E4E",
          "tone-700": "#353131",
          "tone-800": "#201D1D",

          "neutral-50": "#FAFAFA",
          "neutral-100": "#F5F5F5",
          "neutral-200": "#DBDBDB",
          "neutral-300": "#C2C2C2",
          "neutral-400": "#A8A8A8",
          "neutral-500": "#8F8F8F",
          "neutral-600": "#757575",
          "neutral-700": "#5C5C5C",
          "neutral-800": "#424242",
          "neutral-900": "#292929",
          "neutral-1000": "#0F0F0F",
        },
        cila: {
          "blue-50": "#F6F9FE",
          "blue-100": "#EDF4FD",
          "blue-200": "#92B8E8",
          "blue-300": "#6290C8",
          "blue-400": "#1D5AA5",
          "blue-500": "#1F487A",
          "blue-600": "#112641",

          "red-50": "#FFFAFA",
          "red-100": "#FFEBEB",
          "red-200": "#FF9999",
          "red-300": "#FF3D3D",
          "red-400": "#FF0A0A",
          "red-500": "#990000",

          "slate-50": "#F9FAFB",
          "slate-100": "#E8EAED",
          "slate-200": "#D7DADF",
          "slate-300": "#A4ABB7",
          "slate-400": "#818B9C",
          "slate-500": "#636C7E",
          "slate-600": "#484F5B",
          "slate-700": "#2D3139",
          "slate-800": "#1B1E22",
        },
      },
    },
  },
  plugins: [],
};
