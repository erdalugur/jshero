import fs from 'fs'
import { NotFoundException, Redirect, UnAuthorizedException, ForbiddenException, BadRequestException, InternalServerErrorException } from '../exceptions'
import { resolveApp } from './utils'
import { HttpNextFunction, HttpRequest, HttpResponse, HttpStatusCode } from '../types'

export async function errorLogger (err: any, req: HttpRequest, res: HttpResponse, next: HttpNextFunction) {
  req.error = err
  next()
}
export function sendError (req: HttpRequest, res: HttpResponse) {
  const statusCode =  req.error && req.error.status || 404
  const message = req.error && req.error.message || 'Not Found'
  console.log("error log", message)
  const appName = process.env['JSHERO_APPNAME'] || 'JSHERO'
  if (statusCode === HttpStatusCode.RedirectMovedPermanent || statusCode === HttpStatusCode.RedirectTemporary) {
    res.writeHead(statusCode, { location: req.error.destination }).end()
  } else if (typeof(message) !== 'string') {
    res.status(statusCode).send(message).end()
  } else {
    const fileSource = resolveApp(`build/browser/${statusCode}.html`)
    res.status(statusCode)
    if (fs.existsSync(fileSource))
      res.sendFile(fileSource)
    else 
      res.send(`
      <html>
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${appName}</title><style>
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
          <h1>${statusCode}</h1>
          <p>${message}</p>
        </div>
      </body>
      </html>
      `)
  }
}

export function requestContextMiddleware(req: HttpRequest, res: HttpResponse, next: HttpNextFunction) {
  req.redirect = (destination: string, permanent:boolean = false) => {
    req.url = destination
    throw new Redirect(destination, permanent)
  }
  req.notFound = (message) => {
    throw new NotFoundException(message)
  }
  req.unAuthorized = (message) => {
    throw new UnAuthorizedException(message)
  }
  req.forbidden = (message) => {
    throw new ForbiddenException(message)
  }
  req.badRequest = (message) => {
    throw new BadRequestException(message)
  }
  req.internalServerError = (message) => {
    throw new InternalServerErrorException(message)
  }
  next()
}