import { Request, Response, NextFunction} from 'express'
import fs from 'fs'
import { HttpException } from '../exceptions'
import { resolveApp } from './utils'

export async function errorLogger (err: HttpException, req: Request, res: Response, next: NextFunction) {
  console.log(err.message)
  next(err)
}
export function sendError (req: Request, res: Response) {
  const fileSource = resolveApp('build/browser/404.html')
  res.status(404)
  if (fs.existsSync(fileSource))
    res.sendFile(fileSource)
  else 
    res.send('404')
}