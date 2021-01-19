const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',
  watch: true,
  // Control how source maps are generated
  devtool: 'inline-source-map',


  plugins: [
    new MiniCssExtractPlugin(),
  ],
})
