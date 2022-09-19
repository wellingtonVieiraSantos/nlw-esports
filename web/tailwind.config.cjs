/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        'galaxy': "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572fc, #43e7ad, #e1d55d)',
        'game-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}
