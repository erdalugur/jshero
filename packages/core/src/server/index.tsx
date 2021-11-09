import './polyfill'
import { resolveRootModule } from '../resolver'
import express, { Request, Response, NextFunction } from 'express'
import { CreateAppOptions } from '../types'
import compression from 'compression'
import { resolveApp } from './utils'
import { errorLogger, sendError, requestContextMiddleware } from './middleware'
import { createRenderer } from './renderer'

const staticPath = resolveApp('build/browser')

export function createServer (options: CreateAppOptions) {
  const app = express()
  
  app.use(compression())
  
  app.use(requestContextMiddleware)

  const router = express.Router()
  
  function useMiddleware () {
    const { modules, reducers, configureStore, resolveController } = resolveRootModule(options.bootstrap)

    modules.forEach(({statusCode = 200 ,...x}) => {
      const { fn, resolvePrefix, resolveRoutes, withOutputCache, resolveMiddleware, injectedMiddleware } = resolveController(x.controller)
      const middlewares = resolveMiddleware()
      if (x.view) {
        const allMiddleware = [...middlewares, ...injectedMiddleware(true)]
        router.get(x.path, allMiddleware, async (req: any, res: any, next: any) => {
          try {
            const cacheKey = `__${x.path}__${x.name}__`
            const result = await withOutputCache(cacheKey, x.outputCache || 0, async () => {
              const result = await fn(req, res, next)
              const store = configureStore({[x.name]: result }, reducers)
              const { render } = createRenderer({ modules, store, url: req.url as string })
              return render()
            })
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
            res.status(statusCode).json(result)
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