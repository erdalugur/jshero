const { compiler } = require('../config/webpack.config')
const paths = require('../config/paths')
const { copyPublicFolder } = require('./utils')

async function bootstrap(){
  console.log('waiting for server...')
  await compiler('development')
  copyPublicFolder()
  console.log('done.')
  require(paths.appServerBundlePath)
}

bootstrap()