/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'surf-blue': '#0ea5e9',
        'surf-green': '#10b981',
        'surf-purple': '#8b5cf6',
        'surf-orange': '#f59e0b',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            img: {
              borderRadius: '0.375rem',
            },
            h1: {
              fontWeight: '700',
              marginBottom: '1.5rem',
            },
            h2: {
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            a: {
              color: '#0ea5e9',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}