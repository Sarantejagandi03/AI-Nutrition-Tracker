/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#111827",
        leaf: "#0f766e",
        limewash: "#eefbf3",
        coral: "#f97316",
        skywash: "#eef7ff"
      },
      boxShadow: {
        panel: "0 16px 40px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};
