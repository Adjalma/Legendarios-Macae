import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        legendarios: {
          orange: "#ff630f",
          dark: "#0d0d0f",
          charcoal: "#181a1f",
          sand: "#f6f1e6",
          cream: "#fff7ed",
          white: "#fdfdfd"
        }
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgba(255, 99, 15, 0.45), transparent 50%), radial-gradient(circle at 80% 0%, rgba(246, 241, 230, 0.2), transparent 45%)"
      },
      fontFamily: {
        display: ["'Montserrat'", "sans-serif"],
        body: ["'Inter'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

