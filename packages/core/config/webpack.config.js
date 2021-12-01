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

  function webpackPlugins () {
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

  function resolveStyleLoader () {
    return {
      test: /\.(sa|sc|c)ss$/,
      use: [
        isServer ? 'isomorphic-style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { 
            url: false,
            // modules: {
            //   localIdentName: "[name]__[local]___[hash:base64:5]",
            // },
            sourceMap: !isProduction,
          }
        },
        'sass-loader',
      ]
    }
  }

  const config = {
    mode: mode,
    target: isServer ? 'node' : 'web',
    entry: isServer ? paths.appServerJs: paths.appIndexJs,
    module: {
      rules: [
        resolveStyleLoader(),
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
    plugins: webpackPlugins(),
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