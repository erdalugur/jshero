import 'reflect-metadata'
import fetch from 'isomorphic-fetch'
import path from 'path'
import fs from 'fs'

const appDir = fs.realpathSync(process.cwd())
function resolveApp (relativePath: string) {
  return path.resolve(appDir, relativePath)
}
global.resolveApp = resolveApp

if (!process.env.BROWSER) {
  (global as any).window = { 
    document: {},
    __INITIAL_STATE__: {}
  };
  global.fetch = fetch;
  (global as any).document = { };
}


const NODE_ENV = process.env.NODE_ENV || 'development'
const isDevelopment = NODE_ENV === 'development'
if (isDevelopment) {
  require(resolveApp('config/env.js'))
}

export {}