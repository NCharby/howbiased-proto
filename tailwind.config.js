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
        hedged: {
          "100": "rgba(244, 67, 54, 1)",
          "30": "rgba(244, 67, 54, 0.3)"
        },
        implicative: {
          "100": "rgba(255, 152, 0, 1)",
          "30": "rgba(255, 152, 0, 0.3)"
        },
        factive: {
          "100": "rgba(76, 175, 80, 1)",
          "30": "rgba(76, 175, 80, 0.3)"
        },
        assertive: {
          "100": "rgba(33, 150, 243, 1)",
          "30": "rgba(33, 150, 243, 0.3)"
        },
        subjective: {
          "100": "rgba(156, 39, 176, 1)",
          "30": "rgba(156, 39, 176, 0.3)"
        },
        trigger: {
          "100": "rgba(233, 30, 99, 1)",
          "30": "rgba(233, 30, 99, 0.3)"
        }
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
