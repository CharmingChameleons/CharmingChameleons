var path = require('path');

module.exports = {
  entry: './client/src/entry.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/public')
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      }
    ],
  },
};
