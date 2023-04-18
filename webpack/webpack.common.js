const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv
const CopyWebpackPlugin = require('copy-webpack-plugin')
const lodash = require('lodash')
const packageJson = require('../package.json')

if (!argv.env) {
  throw new Error('Please specify the environment with --env')
}

const config = require(`../config/${argv.env}.js`)

const domainToHostWildCard = (domain) => {
  return domain.replace(/^https:\/\//, '*://*.') + '/*'
}

module.exports = {
  mode: config.ENV,
  entry: {
    popup: path.join(__dirname, '../app/entrypoints/popup'),
    inject: path.join(__dirname, '../app/entrypoints/inject'),
    installation_notifier: path.join(
      __dirname,
      '../app/entrypoints/installation_notifier'
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../app/views/popup.ejs'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'app/assets/_locales', to: '_locales' },
        { from: 'app/assets/img', to: 'img' },
        {
          from: `app/manifest.json`,
          to: `manifest.json`,
          transform: (content) => {
            return lodash.template(content)({
              ...config,
              APP_VERSION: packageJson.version,
              FRONTEND_DOMAIN_WILD_CARD: domainToHostWildCard(
                config.FRONTEND_URL
              ),
            })
          },
        },
      ],
    }),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
  },
}
