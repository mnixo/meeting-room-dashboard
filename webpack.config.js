const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/mrd-app.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'sourcemap',
};
