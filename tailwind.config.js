export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#07111f",
        surface: "#0d1728",
        card: "#10223c",
        primary: "#34d399",
        secondary: "#7dd3fc",
        muted: "#8da0bf",
        danger: "#fb7185",
        warning: "#fbbf24",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 30px 70px rgba(4, 11, 23, 0.35)",
      },
    },
  },
  plugins: [],
};
