const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        screens: {
            us: "360px", //ultra small
            ps: "412px", //premium small
            xs: "475px", //extra small
            ...defaultTheme.screens,
        },
        fontFamily: {
            Roboto: ["Roboto, sans-serif"],
        },
        boxShadow: {
            "custom-light": "0 0 10px #313131",
            "custom-dark": "5px 5px 10px #0a0c0e, -5px -5px 10px #14161c",
        },
        extend: {
            colors: {
                "mail-red": "#e3743a",
                "mail-blue": "#0054A8",
                "mail-gray": "#9194a2",
                "mail-white": "#f7f7f7",
            },
        },
    },
    variants: {
        extend: {
            // backgroundColor: ["active", "dark-hover"],
            // // ...
            // borderColor: ["focus-visible", "first"],
            // // ...
            // textColor: ["visited", "dark-hover"],
            boxShadow: ["dark"],
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};