const shell = require('shelljs')
function serve () {
  process.env['NODE_ENV'] = 'production'
  shell.exec('yarn build && node build/server.js')
}
serve()
