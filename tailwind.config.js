/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        carnival: {
          pink: '#FF2D92',
          pinkLight: '#FF6BB5',
          purple: '#9D4EDD',
          purpleLight: '#C77DFF',
          blue: '#00D4FF',
          blueLight: '#7DE8F4',
          orange: '#FF6B35',
          orangeLight: '#FF8C5A',
          yellow: '#FFD60A',
          yellowLight: '#FFE066',
          green: '#00E676',
        },
        dark: {
          bg: '#0F0F1A',
          card: '#1A1A2E',
          border: '#2D2D44',
          text: '#FFFFFF',
          textMuted: '#A0A0B0',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
        glow: 'glow 2s ease-in-out infinite',
        confetti: 'confetti 3s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 45, 146, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 45, 146, 0.8)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        }
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 45, 146, 0.5)',
        'neon-purple': '0 0 20px rgba(157, 78, 221, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        carnival: '0 10px 40px rgba(255, 45, 146, 0.3)',
      },
      backgroundImage: {
        'carnival-gradient': 'linear-gradient(135deg, #FF2D92 0%, #9D4EDD 50%, #00D4FF 100%)',
        'carnival-gradient-vertical': 'linear-gradient(180deg, #FF2D92 0%, #9D4EDD 100%)',
        'party-gradient': 'linear-gradient(45deg, #FF6B35, #FF2D92, #9D4EDD, #00D4FF)',
      }
    },
  },
  plugins: [],
};
