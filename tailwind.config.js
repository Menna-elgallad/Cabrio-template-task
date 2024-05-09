const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: colors.green , 
        info : "#F6F6F6" , 
        error : "#ff6f60;"
      }
    }
  },
  variants: {
    extend: {

      colors: {
        primary: colors.green , 
        info : "#F6F6F6"
      }
    }
  },
  plugins: []
};
