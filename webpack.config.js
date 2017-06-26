var path = require('path');

module.exports = {
  entry: './src/entry.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      }
    ]
  }
};
