export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg)",
                card: "var(--card)",
                text: "var(--text)",
                muted: "var(--muted)",
            },
        },
    },
    plugins: [],
};
