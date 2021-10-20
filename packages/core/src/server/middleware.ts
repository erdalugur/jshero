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
    res.send(`
    <html>
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSHERO</title><style>
    .container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    </style>
    </head>
    <body>
      <div class="container">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    </body>
    </html>
    `)
}