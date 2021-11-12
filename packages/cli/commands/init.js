const fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const { message, success, error, setPackageJson } = require('../utils');
const extra = require('fs-extra')

function init ({ name, projectRoot }) {
  console.log()
  message('Project Template Creating...')
  if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot)

    extra.copySync(path.join(__dirname, '../templates/app'), projectRoot, { recursive: true, overwrite: true, dereference: true })

    setPackageJson(projectRoot, name).then(x => {
      shell.cd(projectRoot)

      console.log()
      success('Project Created Successfully...')
      shell.exec(`rm -rf .cache`)
      console.log()
      message(`cd ${name}`)
      console.log()
      success('Install Dependencies')
      console.log('npm install')
      console.log('- or')
      console.log('yarn install')
      console.log()
      success('For Development')
      message(`yarn dev`)
      console.log()

      success('For Production')
      message(`yarn build`)
      message(`yarn start`)
      console.log()
      success('Module Generation')
      message(`jshero -m moduleName`)
      console.log()
    })
    .catch(e => {
      console.log(e)
    })
    

  } else {
    error('error: there is something in the folder to install')
  }
}
module.exports = init