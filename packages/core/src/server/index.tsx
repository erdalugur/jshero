import './polyfill'
import { resolveRootModule } from '../resolver'
import express, { Request, Response, NextFunction } from 'express'
import { CreateAppOptions, HttpRequest, HttpResponse, HttpNextFunction, RootModuleType } from '../types'
import compression from 'compression'
import { resolveApp } from './utils'
import { errorLogger, sendError, requestContextMiddleware } from './middleware'
import { renderModule } from './renderer'

const staticPath = resolveApp('build/browser')

export function createServer (options: CreateAppOptions) {
  const app = express()
  
  app.use(compression())
  
  app.use(requestContextMiddleware)

  const router = express.Router()
  
  function useMiddleware () {
    const bootstrap = options.bootstrap as RootModuleType
    const { modules, resolveController } = resolveRootModule(bootstrap)

    modules.forEach((x, i) => {
      const { fn, resolvePrefix, resolveRoutes, withOutputCache, resolveMiddleware, injectedMiddleware } = resolveController(x.controller)
      const middlewares = resolveMiddleware()
      if (x.view) {
        const allMiddleware = [...middlewares, ...injectedMiddleware(true)]
        router.get(x.path, allMiddleware, async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
          try {
            const data = await fn<any>(req, res, next)
            const result = await renderModule({ module: x, bootstrap, modules, data })
            res.send(result)
          } catch (error) {
            next(error)
          }
        })
      }
      // api routes
      const prefix = resolvePrefix()
      const routes = resolveRoutes()
      routes.forEach(({ methodName, requestMethod, path}) => {
        const route = (prefix + x.path + path).replace('//', '/')
        const allMiddleware = [...middlewares, ...injectedMiddleware(methodName)]
        router[requestMethod](route, allMiddleware, async (req: Request, res: Response, next: NextFunction) => {
          try {
            const result = await fn(req, res, next, methodName)
            res.status(200).json(result)
          } catch (error) {
            next(error)
          }
        })
      })
    })
    app.use(router)
  }
  
  function useStaticMiddleware () {
    app.get('*.*', express.static(staticPath))
  }

  function useExceptionMiddleware () {
    app.use(errorLogger)
    app.use(sendError)
  }
  return {
    app,
    useAppMiddleware: useMiddleware,
    useStaticMiddleware,
    useExceptionMiddleware
  }
}