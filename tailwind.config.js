module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                header: "3rem",
                footer: "3.5rem",
            },
            minHeight: theme => ({
                main: `calc(100vh - ${theme("height.header")} - ${theme("height.footer")})`,
                48: "12rem",
            }),
            fontFamily: {
                pixel: ["hobo", "vt323"],
            },
            textShadow: {
                hard: "2px 2px 0px #000",
            },
        },
    },
    variants: {
        imageRendering: ["responsive"],
        extend: {},
    },
    plugins: [
        require("tailwindcss-image-rendering")(), // no options to configure
        require("tailwindcss-textshadow"),
    ],
};
