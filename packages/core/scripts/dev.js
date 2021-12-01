const nodemon = require('nodemon')

process
  // Handle normal exits
  .on('exit', (code) => {
    nodemon.emit('quit');
    process.exit(code);
  })

  // Handle CTRL+C
  .on('SIGINT', () => {
    nodemon.emit('quit');
    process.exit(0);
  });
function watch () {
  let scriptPath = require.resolve('./watch')
  nodemon({
    watch: ["src"],
    ext: "ts,js,tsx,css,scss,js",
    ignore: ["**/*.test.ts", "**/*.spec.ts", "node_modules"],
    exec:  `node ${scriptPath}`,
    quiet: true
  })
}
watch()