import path from 'path'

export function resolveApp (relativePath: string) {
  return path.join(path.resolve(process.cwd()), relativePath)
}