module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14002A",
        secondary: "#00FFDC",
        white: "#FFFFFF",
        background: "#EEEEFD",
        gray: '#404B52',
        link: '#0055CC',
        color: '#3F3D56',
        yellow: '#FFC250',
        input: '#D1D5DB',
        red: '#FF0000',
        green: '#108833',
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
