const path = require('path')
const webpack = require('webpack')
const postCSSConfig = require('./postcss.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const host = 'localhost';
const port = 3000;
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true'

const baseDevConfig = () => ({
  devtool: 'eval-cheap-module-source-map',
  entry: {
    popup: [path.join(__dirname, '../chrome/extension/popup')],
    background: [path.join(__dirname, '../chrome/extension/background')],
    installation_notifier: [path.join(__dirname, '../chrome/extension/installation_notifier')]
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {colors: true},
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr'
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  postcss() {
    return postCSSConfig;
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Always keep that line in first position
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new WriteFilePlugin({
      test: /installation_notifier\.bundle\.js/
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: path.join(__dirname, '../config/dev.js')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react-hmre']
      }
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss'
      ]
    }]
  }
});

// Inject script

const injectPageConfig = baseDevConfig();
injectPageConfig.entry = [path.join(__dirname, '../chrome/extension/inject')];
delete injectPageConfig.hotMiddleware;
delete injectPageConfig.module.loaders[0].query;
injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
injectPageConfig.output = {
  path: path.join(__dirname, '../dev/js'),
  filename: 'inject.bundle.js',
};
const appConfig = baseDevConfig();

module.exports = [
  injectPageConfig,
  appConfig
];
