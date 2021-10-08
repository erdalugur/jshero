const fs = require('fs')
const shell = require('shelljs')
const config = require('../package.json');
const { message, success, error, setPackageJson } = require('../utils');

function init ({ name, projectRoot }) {
  if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot)
    shell.cd(projectRoot)

    shell.exec(`git clone ${config.baseApp.git} .`)
    shell.exec(`rm -rf packages cli`)
    message('Fetching packages...')

    setPackageJson(projectRoot)

    shell.exec('npm install')
    
    message('Building fresh packages...')

    shell.exec(`npm run ${config.baseApp.buildCommand}`)
    
    success('project created successfully')
    message(`cd ${name}`)
    shell.exec(`rm -rf .cache`)
		success('-----------For Server------------')
		message(`dev server:  yarn server`)
		message(`build:       yarn build:s`)
		success('-----------For Client------------')
		message(`dev server:  yarn start`)
		message(`build:       yarn build`)
		success('-----------------------')
    success('-----------Module Generation------------')
		message(`jshero -m ModuleName`)
		success('-----------------------')

  } else {
    error('error: there is something in the folder to install')
  }
}

module.exports = {
  init
}