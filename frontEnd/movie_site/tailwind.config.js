/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",   // ⭐ IMPORTANT
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkBg: "#0b0b0d",
                darkCard: "#141417",
                lightBg: "#f9f9f9",
                lightCard: "#ffffff",
            },
            boxShadow: {
                soft: "0 4px 20px rgba(0,0,0,0.15)",
                glow: "0 0 10px rgba(0, 150, 255, 0.6)",
            }
        },
    },
    plugins: [],
};
