/** @type {import('next').NextConfig} */
withTM = require("next-transpile-modules")(["react-financial-charts"]);

module.exports = withTM();
