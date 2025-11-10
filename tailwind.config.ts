import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        legendarios: {
          orange: "#ff630f",
          dark: "#101010",
          charcoal: "#191b1f",
          sand: "#f6f1e6"
        }
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

