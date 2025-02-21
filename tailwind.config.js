/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)'],
        'geist-mono': ['var(--font-geist-mono)'],
        'courier-prime': ['var(--font-courier-prime)'],
        'space-grotesk': ['var(--font-space-grotesk)'],
        'montserrat': ['var(--font-montserrat)'],
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 8px rgba(255, 255, 255, 0.5)',
        'sharp': '1px 1px 0 #000',
      }
    },
  },
  plugins: [],
}
