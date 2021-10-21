const fs = require('fs-extra')
const rimraf = require('rimraf')

const paths = require('../config/paths')
const chalk = require('chalk');

function copyPublicFolder () {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}

module.exports.copyPublicFolder = copyPublicFolder

function removeFolder () {
  rimraf.sync(`${paths.appServerBuild}/static`, { force: true })
}

module.exports.removeFolder = removeFolder


const orange = chalk.hex('#ffc107'),
yellow = chalk.hex('#ffeb3b'),
green = chalk.hex('#7cb342')
const messages = {
  yellow: function(...text) {
    console.log(yellow(text))
  },
  green: function(...text) {
    console.log(green(text))
  },
  orange: function(...text) {
    console.log(orange(text))
  },
  blue: function(...text) {
    console.log(chalk.blue(text))
  }
}

module.exports.messages = messages

/**
 * 
 * @param {any} e 
 * @param stats {import('webpack').StatsAsset}
 * @returns 
 */
module.exports.webpackCallback = function (e, stats) {
  if (e) {
    console.log(e)
    return
  }
  const info = stats.toJson({ all: true, errors: true, warnings: true })
  if (stats.hasErrors()) {
    console.error(info.errors)
    return
  }
  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
}