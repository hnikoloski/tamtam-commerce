// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212", // Dark background color
        foreground: "#ffffff", // White text for contrast
        backdropBlur: {
          lg: '10px',
        },
        primary: {
          50: "#8e24aa", // Lighter shade of purple
          100: "#7b1fa2",
          200: "#6a1b9a",
          300: "#4a148c", // Main purple shade
          400: "#3d0072", // Darker purple
          500: "#35004f", // Even darker purple
          600: "#2a003b",
          700: "#1f0030",
          800: "#150023",
          900: "#0b0017", // Deepest shade of purple
          DEFAULT: "#4a148c", // Default primary color
        },
        card: '#1f2937',
        focus: "#F182F6", // Custom focus color
      },
      transitionDuration: {
        '1500': '1500ms',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1800px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 4px 6px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        // Define a font family (optional)
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        small: "5px", // Small border radius for buttons and cards
        medium: "8px", // Medium border radius for other elements
        large: "12px", // Large radius for rounded corners
      },
      borderWidth: {
        small: "1px", // Thin border
        medium: "2px", // Regular border thickness
        large: "3px", // Thicker border for strong visual separation
      },
      spacing: {
        // Add custom spacing values if needed
        128: "32rem",
      },
    },
  },

};
