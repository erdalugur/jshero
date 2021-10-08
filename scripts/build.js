const shell = require('shelljs')
function build () {
  process.env['NODE_ENV'] = 'production';
  shell.exec('rm -rf build/output && parcel build ./src/index.html -d build/output && tsc')
}
build()
