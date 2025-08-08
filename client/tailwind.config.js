/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.ts",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0B80F2",
        secondary: "#F1F2F5",
        background: "#ffffff",
        accent: "#0B80F2",
        error: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "32px"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      textColor: {
        primary: "#0B80F2",
        secondary: "#F1F2F5",
        background: "#ffffff",
        accent: "#0B80F2",
        error: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b",
      },
    },
  },
  plugins: [],
};
