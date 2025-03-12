/** @type {import('postcss').Config} */
const config = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
          grid: 'autoplace'
        },
        stage: 3,
        features: {
          'custom-properties': false,
          'font-variant-property': true
        }
      }
    ]
  ]
};

export default config;