#!/usr/bin/env node

const { warning, resolveProject } = require('../utils')
const createApp = require('../commands/init')
const createModule = require('../commands/module')
const config = require('../package.json')

const commands = { 
  '-v': 'version', 
  'version': 'version', 
  '-i': 'init', 
  'init': 'init',
  '-m': 'module',
  'module': 'module'
}
const args = process.argv.slice(2);

const baseCommand = args[0]
const script = commands[baseCommand] || ''

function incorrectFn () {
  console.log()
  warning(`Incorrect script available scripts now`)
  console.log()
  console.log(Object.keys(commands).join(', '))
  console.log()
}

function createAppFn() {
  let { name, projectRoot, template } = resolveProject(process.argv)
  if(!name) {
    console.log('Project name is required')
    return
  }
  createApp({projectRoot, name, template})
}

function createModuleFn () {
  let { name, projectRoot } = resolveProject(process.argv)
  if(!name) {
    console.log('Module name is required')
    return
  }
  createModule({name, projectRoot})
}

switch (script) {
  case "module":
    return createModuleFn()
  case "init":
    return createAppFn()
  case "version":
   return console.log(config.version)
  default:
    return incorrectFn()
}
