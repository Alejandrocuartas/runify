/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Adjust if your source files are elsewhere
        "./public/index.html",       // Or any other HTML entry points
    ],
    theme: {
        extend: {},
    },
    plugins: [
    // require('@tailwindcss/typography'), // You can uncomment this later if needed
    ],
} 