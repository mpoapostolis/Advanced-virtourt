/** @type {import("prettier").Config} */
module.exports = {
  tailwindConfig: "./styles/tailwind.config.js",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  organizeImportsSkipDestructiveCodeActions: true,
};
