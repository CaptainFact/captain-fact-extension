const path = require('path')
const webpack = require('webpack')
const postCSSConfig = require('./postcss.config')
const argv = require('yargs').argv

module.exports = {
  entry: {
    popup: path.join(__dirname, '../chrome/extension/popup'),
    background: path.join(__dirname, '../chrome/extension/background'),
    inject: path.join(__dirname, '../chrome/extension/inject'),
    installation_notifier: path.join(
      __dirname,
      '../chrome/extension/installation_notifier'
    ),
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  postcss() {
    return postCSSConfig
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: path.join(__dirname, '../config/' + argv.env + '.js'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
        ],
      },
    ],
  },
}
