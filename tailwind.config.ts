import type { Config } from 'tailwindcss';

/**
 * Meli — "Midnight Atelier" design system.
 *
 * A cinematic, editorial luxury aesthetic for a couture invitation house:
 * deep ink-plum darkness, a single dusty rose-gold accent, hairline rules
 * and oversized ultra-thin type. Tokens are exposed as CSS variables in
 * globals.css so the whole site can be re-themed from one place.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08070c', // deepest background
          900: '#0c0b12',
          800: '#13111c',
          700: '#1b1827',
          600: '#272235',
        },
        bone: '#f3efe8', // warm off-white foreground
        rose: {
          // dusty rose-gold accent
          200: '#f1cfc7',
          300: '#e7b2a5',
          400: '#dd9a8b',
          500: '#cf7e6c',
        },
        champagne: '#c8a86a', // secondary warm gold
      },
      fontFamily: {
        // Wired via next/font in the root layout (CSS variables).
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        persian: ['var(--font-persian)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.28em',
        kicker: '0.4em',
      },
      fontSize: {
        // Fluid display sizes for the oversized editorial headings.
        'display-sm': 'clamp(2.5rem, 6vw, 4.5rem)',
        'display': 'clamp(3.5rem, 11vw, 11rem)',
        'display-xl': 'clamp(4rem, 16vw, 17rem)',
      },
      transitionTimingFunction: {
        atelier: 'cubic-bezier(0.22, 1, 0.36, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(12%,9%)' },
          '70%': { transform: 'translate(9%,4%)' },
          '90%': { transform: 'translate(-1%,7%)' },
        },
        reveal: {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0)' },
        },
        lineflow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'marquee-rtl': 'marquee-rtl 34s linear infinite',
        grain: 'grain 8s steps(6) infinite',
        lineflow: 'lineflow 5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
