/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 40%, 96%)',
        accent: 'hsl(210, 100%, 50%)',
        primary: 'hsl(220, 13%, 18%)',
        success: 'hsl(140, 40%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        warning: 'hsl(25, 90%, 50%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
        'full': '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0,0%,0%,0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
