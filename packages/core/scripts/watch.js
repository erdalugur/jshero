const webpack = require('webpack')
const { configFactory } = require('../config/webpack.config')
const paths = require('../config/paths')
const { copyPublicFolder, webpackCallback } = require('./utils')


const configs = {
  browser: configFactory('development', 'browser'),
  node: configFactory('development', 'node')
}

const compilers = {
  browser: webpack(configs['browser']),
  node: webpack(configs['node'])
}
/**
 * 
 * @param {'browser' | 'node'} target 
 * @returns 
 */
function compiler (target) {
  return new Promise((resolve, reject) => {
    const webpackCompiler = compilers[target]
    webpackCompiler.run((e, stats) => {
      webpackCallback(e, stats)
      return resolve()
    })
  })
} 
async function bootstrap(){
  console.log('')
  console.log('Starting the development server...')
  await compiler('browser')
  await compiler('node')
  copyPublicFolder()
  console.log()
  require(paths.appServerBundlePath)
}

bootstrap()