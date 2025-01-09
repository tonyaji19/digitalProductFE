module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "off-white": "#FAF9F6",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        rubikVinyl: ["Rubik Vinyl", "cursive"],
      },
      screens: {
        mobile: "650px",
      },
      maxWidth: {
        mobile: "650px",
      },
      maxHeight: {
        mobile: "640px",
      },
    },
  },
  plugins: [],
};
