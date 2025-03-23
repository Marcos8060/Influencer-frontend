module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tertiary: "#091ad9",
        secondary: "#5373d4",
        primary: '#3680A1',
        white: "#FFFFFF",
        background: "#f5f7f7",
        gray: '#404B52',
        link: '#0055CC',
        color: '#0a2c50',
        yellow: '#FFC250',
        input: '#D1D5DB',
        red: '#FF0000',
        green: '#108833',
        muted: '#8798ad'
      },
      fontWeight: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '800',
        extrabold: '900',
        black: '950',
      },
    },
  },
  plugins: [],
};
