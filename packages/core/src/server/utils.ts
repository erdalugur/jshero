import path from 'path'
import fs from 'fs'

export function resolveApp (relativePath: string) {
  return path.join(path.resolve(process.cwd()), relativePath)
}

let html: string = ''
export function readHtml (staticPath: string) {
  if (html === '') {
    html = fs.readFileSync(`${staticPath}/index.html`, { encoding: 'utf-8'})
  }
  return html
}