export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050a0d",
        surface: "#0a1217",
        card: "#0e1b22",
        primary: "#7be8cf",
        secondary: "#2cb7be",
        accent: "#0f7384",
        muted: "#8aa0a8",
        danger: "#f07b8b",
        warning: "#d4ae63",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 28px 70px rgba(0, 0, 0, 0.38)",
      },
    },
  },
  plugins: [],
};
