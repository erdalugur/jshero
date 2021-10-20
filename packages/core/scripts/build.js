const { compiler } = require('../config/webpack.config')
const { copyPublicFolder } = require('./utils')

async function bootstrap(){
  await compiler('production')
  copyPublicFolder()
}

bootstrap()