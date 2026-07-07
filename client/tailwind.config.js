export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        edu: ['"Edu NSW ACT Hand Pre"', 'cursive'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        oxanium: ['"Oxanium"', 'cursive'],
        rubik: ['"Rubik"', 'sans-serif'],
        ptsans: ['"PT Sans"', 'sans-serif'],
        scheherazade: ['"Scheherazade New"', 'serif'],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        wiggle: "wiggle 6s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "50%": { transform: "translateY(-10px) rotate(1deg) scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
}
