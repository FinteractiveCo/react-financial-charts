/** @type {import('next').NextConfig} */
withTM = require("next-transpile-modules")([
  "react-financial-charts",
  "@react-financial-charts/core",
  "@react-financial-charts/annotations",
  "@react-financial-charts/axes",
  "@react-financial-charts/scales",
  "@react-financial-charts/series",
  "@react-financial-charts/tooltip",
  "@react-financial-charts/coordinates",
  "@react-financial-charts/indicators",
  "@react-financial-charts/interactive",
  "@react-financial-charts/annotations",
  "@react-financial-charts/utils",
  "charts-terminal",
]);

module.exports = withTM();
