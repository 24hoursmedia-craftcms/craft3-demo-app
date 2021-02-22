const colors = require('tailwindcss/colors');

// https://tailwindcss.com/docs/customizing-colors
module.exports = {
    purge: ["./../templates/**/*.twig"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
};