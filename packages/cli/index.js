#!/usr/bin/env node
const { Command } = require('commander')
const commands = require('./commands')
const config = require('./package.json')
const { resolveProject, error } = require('./utils')
const program = new Command()

program
.version(config.version)
.description(config.description)

program
  .option('-i, --init <name>')
  .option('-m, --module <name>');

program.parse();
try {
  const options = program.opts()
  const keys = Object.keys(options)
  keys.forEach(key => {
    if (commands[key]) {
      let { name, projectRoot } = resolveProject(process.argv)
      if(!name) {
        error(`${name === 'init' ? 'Project' : 'Module'} name is required`)
        return
      }
      commands[key]({ name, projectRoot })
    }
  })
} catch (_error) {
  error(_error)
}

