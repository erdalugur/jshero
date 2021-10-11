#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk');
const fs = require('fs');

module.exports = {
  resolveProject () {
    let name = process.argv[3].trim()
    let projectRoot = path.resolve(name);
    return {
      name,
      projectRoot
    }
  },
  error (message) {
    console.log()
    console.log(chalk.red(message))
    console.log()
  },
  success (message) {
    console.log()
    console.log(chalk.green(message))
    console.log() 
  },
  message (message) {
    console.log()
    console.log(message)
    console.log() 
  },
  setPackageJson (projectRoot) {
    const meta = {
      "name": "jshero_app",
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