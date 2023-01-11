/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '414px',
      'md': '575px',
      'lg': '925px',
      'xl': '1440px',
    },
    extend: {},
  },
  plugins: [],
}
