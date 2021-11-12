const { default: got} = require('got')
const fs = require('fs')
const tar = require('tar')
const { Stream } = require('stream')
const { promisify } = require('util')
const pipeline = promisify(Stream.pipeline)

const username = 'erdalugur', name = 'jshero';

async function getRepoInfo () { 
  return got(`https://api.github.com/repos/${username}/${name}`).then(x => {
    const info = JSON.parse(x.body)
    return {
      branch: info['default_branch']
    }
  })
}

async function downloadAndExtractRepo(
  root,
  { filePath }
) {
  const { branch } = await getRepoInfo()
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }
  return pipeline(
    got.stream(
      `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`
    ),
    tar.extract(
      { cwd: root, strip: filePath ? filePath.split('/').length + 1 : 1 },
      [`${name}-${branch}${filePath ? `/${filePath}` : ''}`]
    )
  )
}

module.exports = downloadAndExtractRepo