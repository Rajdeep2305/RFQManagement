/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        sanchez: ['Sanchez', 'serif'],
      },
      animation: {
        // Custom round animation that makes the dots scale
        round: 'round 1s ease-in-out infinite',
      },
      keyframes: {
        round: {
          '0%, 100%': {
            transform: 'scale(1)',  // Original size
          },
          '50%': {
            transform: 'scale(1.5)',  // Scaled up at halfway point
          },
        },
      },
      delay: {
        '100': '0.1s',
        '200': '0.2s',
        '300': '0.3s',
        '400': '0.4s',
      },
    },
  },
  plugins: [],
}