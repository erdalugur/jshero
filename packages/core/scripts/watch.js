const { compiler } = require('../config/webpack.config')
const paths = require('../config/paths')

async function bootstrap(){
  console.log('waiting for server...')
  await compiler('development')
  console.log('done.')
  require(paths.appServerBundlePath)
}

bootstrap()