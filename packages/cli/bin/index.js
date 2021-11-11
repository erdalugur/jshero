#!/usr/bin/env node

const child = require('child_process')
const { warning, resolveProject } = require('../utils')
const createApp = require('../commands/init')
const createModule = require('../commands/module')

const commands = ['-m', 'module', '-i', 'init']
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => commands.includes(x)
);

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
if (commands.includes(script)) {
  let command = ''
  if (script === '-m')  {
    command = 'module'
  } else if (script === '-i') {
    command = 'init'
  } else {
    command = script
  }
  let { name, projectRoot } = resolveProject(process.argv)
  if(!name) {
    console.log(`${name === 'init' ? 'Project' : 'Module'} name is required`)
    return
  }
  if (command == 'init') {
    createApp({projectRoot, name})
  } else if (command == 'module') {
    createModule({name, projectRoot})
  }

} else {
  console.log()
  warning(`Incorrect script available scripts now`)
  console.log()
  console.log(commands.join(', '))
  console.log()
}
