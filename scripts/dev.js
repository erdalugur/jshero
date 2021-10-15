const { compiler } = require('../config/webpack.config')

async function bootstrap(){
  await compiler('development')
  require('../build/server.js')
}

bootstrap()