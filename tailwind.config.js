/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f0f7fe',
          '100': '#deedfb',
          '200': '#c4e1f9',
          '300': '#9bcef5',
          '400': '#6bb3ef',
          '500': '#4995e8',
          '600': '#3379dd',
          '700': '#285ebe', // Base color
          '800': '#2952a4',
          '900': '#264782',
          '950': '#1b2c50',
        }
      },
    },
    plugins: [],
  }
}
