const webpack = require('webpack')
const { configFactory } = require('../config/webpack.config')
const { copyPublicFolder, webpackCallback, removeFolder } = require('./utils')

const configs = {
  browser: configFactory('production', 'browser'),
  node: configFactory('production', 'node')
}

/**
 * 
 * @param {'browser' | 'node'} target 
 * @returns 
 */
function compiler (target) {
  return new Promise((resolve, reject) => {
    const webpackCompiler = webpack(configs[target])
    webpackCompiler.run((e, stats) => {
      webpackCallback(e, stats)
      return resolve()
    })
  })
}
async function bootstrap(){
  console.log('')
  console.log('Creating optimized production build for client...')
  await compiler('browser')
  console.log()
  console.log('Creating optimized production build for server...')
  require('ignore-styles')
  await compiler('node')
  removeFolder()
  copyPublicFolder()
}

bootstrap()