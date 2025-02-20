/** @type {import('tailwindcss').Config} */
const formsPlugin = require('@tailwindcss/forms');

module.exports = {
  content: [
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],
  theme: {
    extend: { 
      fontSize: {
      // Adjust base sizes by increasing by 1xl equivalent
      sm: '0.875rem', // Tailwind's default `sm`
      base: '1.125rem', // Default `base` increased from 1rem
      lg: '1.25rem', // Default `lg` increased from 1.125rem
      xl: '1.375rem', // Default `xl` increased from 1.25rem
      '2xl': '1.625rem', // Default `2xl` increased from 1.5rem
      '3xl': '2rem', // Default `3xl` increased from 1.875rem
      '4xl': '2.625rem', // Default `4xl` increased from 2.25rem
      '5xl': '3.5rem', // Default `5xl` increased from 3rem
      '6xl': '4.375rem', // Default `6xl` increased from 3.75rem
      '7xl': '5.25rem', // Default `7xl` increased from 4.5rem
    },
      fontFamily: {
      
        sans: ['Smooch Sans', 'sans-serif']
      },
    },
  },
  plugins: [
    formsPlugin,
  ],
};
