const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const getClientEnvironment = require('./env')
const paths = require('./paths')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * 
 * @param {'development' | 'production'} mode 
 * @param {'node' | 'browser'} target 
 * @returns 
 */
function configFactory (mode = 'development', target = 'node') {
  process.env.NODE_ENV = mode
  const isProduction = mode === 'production'
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))
  const isServer = target === 'node'

  function webpackPlugings () {
    const items = []
    if (!isServer) {
      items.push(
        new HtmlWebpackPlugin({
          template: paths.appHtml,
          inject: 'body',
          publicPath: paths.publicUrlOrPath
        })
      )
    }
    items.push(
      new MiniCssExtractPlugin({
        filename: (isProduction ? 'static/css/[name].[contenthash:8].css' : 'static/css/main.css')
      })
    )
    items.push(
      new webpack.DefinePlugin({
        ...env.stringified, 
        PRODUCTION: JSON.stringify(mode),
        'typeof window': JSON.stringify('object'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BROWSER': JSON.stringify(!isServer)
      })
    )
    return items
  }
  const config = {
    mode: mode,
    target: isServer ? 'node' : 'web',
    entry: isServer ? paths.appServerJs: paths.appIndexJs,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // instead of style-loader
            //'style-loader',
            {
              loader: 'css-loader',
              options: { url: false }
            }
            //'sass-loader',
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.mjs'],
      modules: ["node_modules", paths.appNodeModules, paths.appSrc]
    },
    plugins: webpackPlugings(),
    devtool: !isProduction ? 'source-map': false,
    externals: isServer && [nodeExternals()] || [],
    output: {
      path: isServer ? paths.appServerBuild : paths.appBuild,
      publicPath: paths.publicUrlOrPath,
      filename: isServer ? 'server.js' : (isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js'),
    },
    performance: {
      hints: false
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    }
  }
  if (isProduction && !isServer) {
    config.optimization.minimizer.push(
      new TerserPlugin()
    )
  }
  return config
}

module.exports.configFactory = configFactory