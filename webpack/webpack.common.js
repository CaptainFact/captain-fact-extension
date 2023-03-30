const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv
const CopyWebpackPlugin = require('copy-webpack-plugin')

if (!argv.env) {
  throw new Error('Please specify the environment with --env')
}

const nodeEnv = ['staging', 'prod'].includes(argv.env)
  ? 'production'
  : 'development'

const htmlTemplatesParameters = { env: argv.env }

module.exports = {
  mode: nodeEnv,
  entry: {
    popup: path.join(__dirname, '../chrome/extension/popup'),
    background: path.join(__dirname, '../chrome/extension/background'),
    inject: path.join(__dirname, '../chrome/extension/inject'),
    installation_notifier: path.join(
      __dirname,
      '../chrome/extension/installation_notifier'
    ),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: path.resolve(__dirname, '../config/' + argv.env + '.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /[^/]+\/[\S]+.dev$/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../chrome/views/popup.ejs'),
      filename: 'popup.html',
      templateParameters: htmlTemplatesParameters,
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../chrome/views/background.ejs'),
      filename: 'background.html',
      templateParameters: htmlTemplatesParameters,
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../chrome/views/inject.ejs'),
      filename: 'inject.html',
      templateParameters: htmlTemplatesParameters,
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `chrome/manifest.${argv.env}.json`, to: `manifest.json` },
        { from: 'chrome/assets/_locales', to: '_locales' },
        { from: 'chrome/assets/img', to: 'img' },
      ],
    }),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
  },
}
