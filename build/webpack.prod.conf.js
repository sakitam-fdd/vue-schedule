'use strict'
const utils = require('./utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: false
    })
  },
  output: {
    filename: 'vue-schedule.min.js'
  },
  devtool: '#source-map',
  watch: false,
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'vue-schedule.min.css',
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: {
          inline: false
        }
      }
    }),
    new BundleAnalyzerPlugin()
  ]
  // optimization: {
  //   // chunk for the webpack runtime code and chunk manifest
  //   runtimeChunk: {
  //     name: 'manifest'
  //   },
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         priority: -20,
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // }
})

module.exports = webpackConfig
