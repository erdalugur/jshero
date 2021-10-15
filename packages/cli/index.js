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
const child = require('child_process')
const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'dev'
);

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['build', 'dev'].includes(script)) {
  const result = child.spawnSync(
    process.execPath,
    nodeArgs
      .concat(require.resolve('./scripts/' + script))
      .concat(args.slice(scriptIndex + 1)),
    { stdio: 'inherit' }
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      );
    }
    process.exit(1);
  }
  process.exit(result.status);
} else {
  console.log('Unknown script "' + script + '".');
}

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

