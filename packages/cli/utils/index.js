#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk');
const fs = require('fs');
const https = require('https');

function getJsHeroVersion () {
  return new Promise((resolve, reject) => {
    https
      .get(
        'https://registry.npmjs.org/-/package/jshero-core/dist-tags',
        res => {
          if (res.statusCode === 200) {
            let body = '';
            res.on('data', data => (body += data));
            res.on('end', () => {
              resolve(JSON.parse(body).latest);
            });
          } else {
            reject();
          }
        }
      )
      .on('error', () => {
        reject();
      });
  });
}

module.exports = {
  resolveApp (path) {
    return require.resolve(path)
  },
  resolveProject () {
    if (process.argv.length < 4) {
      return {
        name: ''
      }
    }
    let name = process.argv[3].trim()
    let projectRoot = path.resolve(name);
    let template = process.argv.length > 4 && process.argv[5].trim() || 'app'
    return {
      name,
      projectRoot,
      template
    }
  },
  warning (message) {
    console.log(chalk.yellow(message))
  },
  error (message) {
    console.log(chalk.red(message))
  },
  success (message) {
    console.log(chalk.green(message))
  },
  message (message) {
    console.log(message)
  },
  async setPackageJson (projectRoot, name) {
    const meta = {
      "name": name,
      "version": "1.0.0",
      "main": "",
      "author": "",
    }
    const packageJson = `${projectRoot}/package.json`
    let config = require(packageJson)
    // delete config.repository
    // delete config.bugs
    // delete config.homepage
    // delete config.bin

    config.name = name
    config.version = "1.0.0"
    config.dependencies['jshero-core'] = await getJsHeroVersion()

    fs.writeFileSync(packageJson, JSON.stringify({...config, ...meta }, null, 2), { encoding: 'utf-8' })
  },
  /**
   * 
   * @param {string} name 
   */
  makeNames (name){
    const lowerCaseName = name.toLowerCase()
	  const pascalCaseName = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1)
    return {
      lowerCaseName,
      pascalCaseName
    }
  }
}