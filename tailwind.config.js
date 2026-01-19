/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1C2D",
        accent: "#C1121F",
        background: "#F8F9FA",
        text: "#1F2933",
        muted: "#6B7280",
        gold: "#D4AF37",
      },
    },
  },
  plugins: [],
};
