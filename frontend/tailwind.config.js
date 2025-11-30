/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f172a', // slate-950
                surface: '#1e293b', // slate-800
                primary: {
                    DEFAULT: '#06b6d4', // cyan-500
                    hover: '#0891b2', // cyan-600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#8b5cf6', // violet-500
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: '#10b981', // emerald-500
                    foreground: '#ffffff',
                },
                muted: {
                    DEFAULT: '#334155', // slate-700
                    foreground: '#94a3b8', // slate-400
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pop: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
