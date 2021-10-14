const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const getClientEnvironment = require('./env')
const paths = require('./paths')

/**
 * 
 * @param {'development' | 'production'} mode 
 * @param {'node' | 'browser'} target 
 * @returns 
 */
module.exports = (mode = 'development', target = 'node') => {
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
      new webpack.DefinePlugin({
        ...env.stringified, 
        PRODUCTION: JSON.stringify(mode),
        'typeof window': JSON.stringify('object'),
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.BROWSER': JSON.stringify(!isServer)
      })
    )
    return items
  }
  return {
    mode: mode,
    target: isServer ? 'node' : 'web',
    entry: isServer ? paths.appServerJs: paths.appIndexJs,
    module: {
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
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.mjs'],
      modules: ["node_modules", paths.appNodeModules, paths.appSrc]
    },
    plugins: webpackPlugings(),
    devtool: !isProduction ? 'source-map': undefined,
    externals: isServer && [nodeExternals()] || [],
    output: {
      path: isServer ? paths.appServerBuild : paths.appBuild,
      publicPath: paths.publicUrlOrPath,
      filename: isServer ? 'server.js' : (isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js'),
    }
  }
}
