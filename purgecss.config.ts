module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.js'],
  css: ['./dist/fd-frontend/styles.*.css'],
  output: './dist/fd-frontend/',
  defaultExtractor: (content: any) => content.match(/[\w-/:]+(?<!:)/g) || [],
};
