module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts'],
  css: ['./dist/fd-frontend/styles.*.css'],
  defaultExtractor: (content: any) => content.match(/[\w-/:]+(?<!:)/g) || [],
  output: './dist/fd-frontend/',
};
