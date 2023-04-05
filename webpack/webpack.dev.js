const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = () => {
  console.log(
    'Please allow `https://localhost:3000` connections in Google Chrome, and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)'
  )
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      writeToDisk: true,
    },
    output: {
      path: path.join(__dirname, '../dev'),
    },
  })
}
