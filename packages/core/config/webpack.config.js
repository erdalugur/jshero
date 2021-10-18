const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const path = require('path')
const getClientEnvironment = require('./env')
const paths = require('./paths')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
  return {
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
    devtool: !isProduction ? 'source-map': undefined,
    externals: isServer && [nodeExternals()] || [],
    output: {
      path: isServer ? paths.appServerBuild : paths.appBuild,
      publicPath: paths.publicUrlOrPath,
      filename: isServer ? 'server.js' : (isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js'),
    }
  }
}
/**
 * 
 * @param {'browser' | 'node'} target 
 * @param {'development' | 'production'} mode
 * @returns 
 */
 async function builder (mode,target) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(configFactory(mode, target))
    compiler.run((e, stats) => {
      if (e) {
        console.log(e)
        return reject(e)
      }
      return resolve(createStats(stats))
    })
  }) 
}

module.exports = {
  /**
 * 
 * @param {'development' | 'production'} mode
 * @returns 
 */
  compiler: async function (mode) {
    await builder(mode,'browser')
    await builder(mode,'node')
  }
}
/**
 * 
 * @param {} stats 
 * @returns {{ errors: string[], warnings: string[]}}
 */
 function createStats (stats) {
  const { errors = [], warnings = [] } = stats.toJson({ all: false, warnings: true, errors: true })
  return { 
    errors: errors.map(x => x.message), 
    warnings: warnings.map(x => x.message)
  }
}