/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notos: "'Noto Sans Mono', monospace",
        literata: "'Literata', serif",
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        mdblue: "#394867",
        darkblue: "#212A3E",
        light: "#9BA4B5",
        black: "#121212",
        gray: "#434343",
      },
    },
  },
  plugins: [],
};
