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
        'space-grotesk': ['var(--font-space-grotesk)']
      },
    },
  },
  plugins: [],
}
