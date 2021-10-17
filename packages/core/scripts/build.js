const { compiler } = require('../config/webpack.config')

async function bootstrap(){
  await compiler('production')
}

bootstrap()