/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488',      // Warm teal - friendly and calming
        secondary: '#f97316',    // Bright orange - energetic and warm  
        accent: '#fbbf24',       // Sunny yellow - cheerful and optimistic
        purple: '#a855f7',       // Soft purple - creative and fun
        cream: '#fefce8',        // Warm cream background
        peach: '#fed7aa'         // Soft peach for cards
      }
    },
  },
  plugins: [],
}