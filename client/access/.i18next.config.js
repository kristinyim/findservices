module.exports = {
  createOldCatalogs: false,
  input: "src/**/*.{js,jsx}",
  locales: ["en", "es", "vi", "zh"],
  output: "public/locales/$LOCALE/$NAMESPACE.json",
  sort: true,
};
