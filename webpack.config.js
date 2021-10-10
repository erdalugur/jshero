const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const { paths } = require('./config')
/**
 * 
 * @param {'development' | 'production'} mode 
 * @param {'node' | 'browser'} target 
 * @returns 
 */
module.exports = (mode = 'development', target = 'node') => {
  const isProduction = mode === 'production'
  const modules = {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
  const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
  }
  
  const browser = {
    mode: mode,
    entry: paths.appIndexJs,
    module: modules,
    resolve: resolve,
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        inject: 'body',
        publicPath: paths.publicUrlOrPath
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        'typeof window': JSON.stringify('object'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BROWSER': JSON.stringify(true),
      })
    ],
    output: {
      filename: isProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/bundle.js',
      path: paths.appBuild,
      publicPath: paths.publicUrlOrPath
    }
  }
  const server = {
    mode: mode,
    entry: paths.appServerJs,
    target: 'node',
    output: {
      filename: 'server.js',
      path: paths.appServerBuild,
      publicPath: paths.publicUrlOrPath
    },
    externals: [nodeExternals()],
    module: modules,
    resolve: resolve,
    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        'typeof window': JSON.stringify('object'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BROWSER': JSON.stringify(false),
      })
    ]
  }

  if(!isProduction){
    browser.devtool = 'source-map'
    server.devtool = 'source-map'
  }

  const config = { browser, node: server}
  return config[target]
}
