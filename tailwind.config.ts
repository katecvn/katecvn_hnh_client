import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Tech Blue Color Palette
        "tech-blue": {
          50: "hsl(240, 100%, 98%)",
          100: "hsl(239, 100%, 95%)",
          200: "hsl(238, 100%, 89%)",
          300: "hsl(237, 100%, 80%)",
          400: "hsl(235, 100%, 68%)",
          500: "hsl(214, 100%, 50%)",
          600: "hsl(213, 93%, 42%)",
          700: "hsl(212, 84%, 35%)",
          800: "hsl(211, 75%, 28%)",
          900: "hsl(210, 67%, 22%)",
          950: "hsl(209, 61%, 16%)",
        },
        "cyber-blue": "hsl(195, 100%, 50%)",
        "electric-blue": "hsl(210, 100%, 56%)",
        "neon-blue": "hsl(200, 100%, 50%)",
        "steel-blue": "hsl(207, 44%, 49%)",
        "navy-tech": "hsl(220, 39%, 11%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Tech Blue Animations
        "tech-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 hsl(214, 100%, 50%, 0.7)",
          },
          "70%": {
            boxShadow: "0 0 0 10px hsl(214, 100%, 50%, 0)",
          },
        },
        "cyber-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(195, 100%, 50%), 0 0 10px hsl(195, 100%, 50%), 0 0 15px hsl(195, 100%, 50%)",
          },
          "50%": {
            boxShadow:
              "0 0 10px hsl(195, 100%, 50%), 0 0 20px hsl(195, 100%, 50%), 0 0 30px hsl(195, 100%, 50%), 0 0 40px hsl(195, 100%, 50%)",
          },
        },
        "matrix-rain": {
          "0%": {
            transform: "translateY(-100vh)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh)",
            opacity: "0",
          },
        },
        "data-stream": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        hologram: {
          "0%, 100%": {
            opacity: "0.8",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.02)",
          },
        },
        "neon-flicker": {
          "0%, 100%": {
            textShadow: "0 0 5px hsl(200, 100%, 50%), 0 0 10px hsl(200, 100%, 50%), 0 0 15px hsl(200, 100%, 50%)",
          },
          "50%": {
            textShadow: "0 0 2px hsl(200, 100%, 50%), 0 0 5px hsl(200, 100%, 50%), 0 0 8px hsl(200, 100%, 50%)",
          },
        },
        "tech-scan": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(180deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "tech-pulse": "tech-pulse 2s infinite",
        "cyber-glow": "cyber-glow 2s ease-in-out infinite",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "data-stream": "data-stream 3s ease-in-out infinite",
        hologram: "hologram 3s ease-in-out infinite",
        "neon-flicker": "neon-flicker 1.5s ease-in-out infinite",
        "tech-scan": "tech-scan 2s ease-in-out infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
