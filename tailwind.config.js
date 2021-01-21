module.exports = {
  purge: {
    // enabled: true,
    content: [
      './src/views/**/*.ejs'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      xl: '1440px',
      center: true
    },
    colors: {
      background: '#E6E6E6',
      primary: "#000",
      header: {
        font: "#ffffff",
        bg: "#263238"
      },

      panel: {
        font: "#000000",
        bg: "#ECEFF1"
      },

      aside: {
        bg: "#F8F8F8",
        border: "#90A4AE"
      },

      highlights: {
        hedged: "#f44336",
        implicative: "#ff9800",
        factive: "#4caf50",
        assertive: "#2196f3",
        subjective: "#9c27b0",
        trigger: "#e91e63"
      }
    },
    fontFamily: {
      display: ["Oswald", "sans-serif"],
      body: ["Roboto", "sans-serif"]
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '34px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
