'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')
const chalk = require('react-dev-utils/chalk')
const fs = require('fs-extra')
const bfj = require('bfj')
const webpack = require('webpack')
const configFactory = require('../config/webpack.config')
const { paths } = require('../config')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const isInteractive = process.stdout.isTTY

const argv = process.argv.slice(2)
const writeStatsJson = argv.indexOf('--stats') !== -1

const { checkBrowsers } = require('react-dev-utils/browsersHelper')
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}
function exceptionChecker (err, stats, previousFileSizes) {
  return new Promise((resolve, reject) => {
    let messages = {
      errors: [],
      warnings: []
    }
    if (err) {
      if (!err.message) {
        return reject(err)
      }

      let errMessage = err.message
      if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
        errMessage +=
          '\nCompileError: Begins at CSS selector ' +
          err['postcssNode'].selector
      }

      messages = formatWebpackMessages({
        errors: [errMessage],
        warnings: []
      })
    } else {
      const jsonStats = stats.toJson({ all: false, warnings: true, errors: true })
      messages = formatWebpackMessages(
        { errors: (jsonStats.errors || []).map(x => x.message), 
          warnings: (jsonStats.warnings || []).map(x => x.message)
        }
      )
    }
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1
      }
      return reject(new Error(messages.errors.join('\n\n')))
    }
    if (
      process.env.CI &&
      (typeof process.env.CI !== 'string' ||
        process.env.CI.toLowerCase() !== 'false') &&
      messages.warnings.length
    ) {
      console.log(
        chalk.yellow(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
        )
      )
      return reject(new Error(messages.warnings.join('\n\n')))
    }
    const resolveArgs = {
      stats,
      previousFileSizes,
      warnings: messages.warnings
    }
    if (writeStatsJson) {
      return bfj
        .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
        .then(() => resolve(resolveArgs))
        .catch(error => reject(new Error(error)))
    }
    return resolve(resolveArgs)
  })
}
const taskCallback = ({ stats, previousFileSizes, warnings }, buildFolder = paths.appBuild) => {
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'))
    console.log(warnings.join('\n\n'))
    console.log(
      '\nSearch for the ' +
        chalk.underline(chalk.yellow('keywords')) +
        ' to learn more about each warning.'
    )
    console.log(
      'To ignore, add ' +
        chalk.cyan('// eslint-disable-next-line') +
        ' to the line before.\n'
    )
  } else {
    console.log(chalk.green('\n Compiled successfully.\n'))
  }

  console.log('File sizes after gzip:\n')
  printFileSizesAfterBuild(
    stats,
    previousFileSizes,
    buildFolder,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  )
  console.log()
}

const taskError = err => {
  const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'
  if (tscCompileOnError) {
    console.log(
      chalk.yellow(
        'Compiled with the following type errors (you may want to check these before deploying your app):\n'
      )
    )
    printBuildError(err)
  } else {
    console.log(chalk.red('Failed to compile.\n'))
    printBuildError(err)
    process.exit(1)
  }
}
checkBrowsers(paths.appPath, isInteractive)
  .then(() => measureFileSizesBeforeBuild(paths.appBuild))
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild)
    // Merge with the public folder
    copyPublicFolder()
    // Start the webpack build
    return build(previousFileSizes, 'browser')
  })
  .then(taskCallback, taskError)
  .then(() => measureFileSizesBeforeBuild(paths.appServerBuild))
  .then((previousFileSizes) => build(previousFileSizes, 'node'))
  .then(data => taskCallback(data, paths.appServerBuild), taskError)
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
// Create the production build and print the deployment instructions.
/**
 * 
 * @param {any} previousFileSizes 
 * @param {"node" | "browser"} target 
 * @returns 
 */
function build (previousFileSizes, target = 'browser') {
  const config = configFactory('production', target)
  console.log(`Creating ${target === 'browser' ? 'browser' : 'server' } build...`)
  return new Promise((resolve, reject) => {
    const compiler = webpack(config)
    compiler.run((err, stats) => {
      exceptionChecker(err, stats, previousFileSizes)
      .then(resolveArgs => resolve(resolveArgs))
      .catch(e => reject(e))
    })
  })
}


function copyPublicFolder () {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}

