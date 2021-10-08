const shell = require('shelljs')
function start () {
  process.env['NODE_ENV'] = 'development'
  shell.exec('nodemon')
}
start()
