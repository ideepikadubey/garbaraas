/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: "#130205",
          900: "#22050b",
          850: "#2e0710",
          800: "#3d0a16",
          750: "#4e0c1c",
          700: "#600f24",
          600: "#7c1530",
          500: "#991c3d",
        },
        gold: {
          100: "#fff6d9",
          200: "#fae8b0",
          300: "#f3d580",
          400: "#e6bf4d",
          500: "#d9a635",
          600: "#b68322",
          700: "#8f6314",
          800: "#66440c",
        },
        cream: {
          50: "#fefcf9",
          100: "#fdf8ee",
          200: "#f7ecd3",
          300: "#eddcba",
          400: "#dbc598",
        },
        // Authentic Garba & Navratri Festive Palette
        garba: {
          pink: {
            300: "#f472b6",
            400: "#f43f5e",
            500: "#ec4899", // Vibrant Rani Pink
            600: "#db2777",
            700: "#be185d",
            800: "#9d174d",
            900: "#700c34",
            950: "#4a0521",
          },
          orange: {
            300: "#fdba74",
            400: "#fb923c",
            500: "#f97316", // Bright Kesariya
            600: "#ea580c",
            700: "#c2410c",
            800: "#9a3412",
            950: "#431407",
          },
          teal: {
            300: "#67e8f9",
            400: "#22d3ee",
            500: "#06b6d4", // Morpankhi Peacock Teal
            600: "#0891b2",
            700: "#0e7490",
            800: "#155e75",
            950: "#082f49",
          },
          purple: {
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7", // Royal Jamuni Purple
            600: "#9333ea",
            700: "#7e22ce",
            800: "#581c87",
            950: "#2e1065",
          },
          green: {
            300: "#86efac",
            400: "#4ade80",
            500: "#10b981", // Emerald Mehendi Green
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            950: "#022c22",
          },
          yellow: {
            300: "#fde047",
            400: "#facc15",
            500: "#eab308", // Haldi Pitambari Gold
            600: "#ca8a04",
          },
          red: {
            500: "#ef4444",
            600: "#dc2626", // Sindoor Kumkum Red
            700: "#b91c1c",
            950: "#450a0a",
          }
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cinzel'", "Georgia", "serif"],
        display: ["'Cinzel Decorative'", "'Cinzel'", "'Playfair Display'", "serif"],
        festive: ["'Yatra One'", "'Rozha One'", "'Mukta'", "cursive", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Outfit'", "system-ui", "sans-serif"],
        hindi: ["'Rozha One'", "'Yatra One'", "'Mukta'", "serif"],
      },
      backgroundImage: {
        "festive-radial": "radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.18), rgba(217, 166, 53, 0.15) 35%, transparent 70%)",
        "gold-gradient": "linear-gradient(135deg, #fae8b0 0%, #d9a635 50%, #8f6314 100%)",
        "maroon-gradient": "linear-gradient(180deg, #130205 0%, #2e0710 50%, #130205 100%)",
        "garba-rainbow": "linear-gradient(135deg, #ec4899 0%, #f97316 35%, #eab308 65%, #06b6d4 100%)",
        "garba-fire": "linear-gradient(135deg, #e11d48 0%, #f97316 50%, #facc15 100%)",
        "garba-royal": "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)",
        "garba-peacock": "linear-gradient(135deg, #06b6d4 0%, #0284c7 50%, #7c3aed 100%)",
        "garba-rani": "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #be185d 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(217, 166, 53, 0.25)",
        "gold-glow-lg": "0 0 50px rgba(217, 166, 53, 0.35)",
        "gold-border": "0 0 0 1px rgba(217, 166, 53, 0.4)",
        "pink-glow": "0 0 25px rgba(236, 72, 153, 0.35)",
        "orange-glow": "0 0 25px rgba(249, 115, 22, 0.35)",
        "teal-glow": "0 0 25px rgba(6, 182, 212, 0.35)",
        "purple-glow": "0 0 25px rgba(168, 85, 247, 0.35)",
        "green-glow": "0 0 25px rgba(16, 185, 129, 0.35)",
        "festive-glow": "0 0 35px rgba(245, 158, 11, 0.25), 0 0 60px rgba(236, 72, 153, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "diya-glow": "diyaGlow 2.5s ease-in-out infinite alternate",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        diyaGlow: {
          "0%": { filter: "drop-shadow(0 0 4px rgba(230, 191, 77, 0.6))", transform: "scale(1)" },
          "100%": { filter: "drop-shadow(0 0 14px rgba(230, 191, 77, 0.95))", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        }
      }
    },
  },
  plugins: [],
};
