import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        'background-secondary': 'hsl(var(--background-secondary) / <alpha-value>)',
        'background-deep': 'hsl(var(--background-deep) / <alpha-value>)',
        'background-elevated': 'hsl(var(--background-elevated) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'border-hover': 'hsl(var(--border-hover) / <alpha-value>)',
        'border-accent': 'hsl(var(--border-accent) / <alpha-value>)',
        'text-primary': 'hsl(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-hover': 'hsl(var(--accent-hover) / <alpha-value>)',
        danger: 'hsl(var(--danger) / <alpha-value>)',
        'danger-hover': 'hsl(var(--danger-hover) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        'success-hover': 'hsl(var(--success-hover) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif']
      },
      borderRadius: {
        small: '8px',
        medium: '12px',
        large: '16px',
        card: '18px',
        popup: '20px'
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        dialog: '0 10px 32px -6px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        dropdown: '0 4px 20px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)'
      },
      transitionDuration: {
        standard: '200ms'
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
} satisfies Config;
