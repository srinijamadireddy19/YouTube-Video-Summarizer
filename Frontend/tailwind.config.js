/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#c1121f",
                "background-light": "#f8f6f6",
                "background-dark": "#211112",
                "brick-red": "#c1121f",
                "papaya-whip": "#fdf0d5",
                "steel-blue": "#669bbc",
                "molten-lava": "#780000"
            },
            fontFamily: {
                display: ["Eb Garamond", "serif"],
                sans: ["Space Grotesk", "sans-serif"]
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                full: "9999px"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
