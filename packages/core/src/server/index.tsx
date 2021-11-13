import './polyfill'
import { resolveRootModule } from '../resolver'
import express, { Request, Response, NextFunction } from 'express'
import { CreateAppOptions, HttpRequest, HttpResponse, HttpNextFunction, RootModuleProps } from '../types'
import compression from 'compression'
import { resolveApp } from './utils'
import { errorLogger, sendError, requestContextMiddleware } from './middleware'
import { renderFullPage } from './renderer'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { createApp } from '../main'


const staticPath = resolveApp('build/browser')

export function createServer (options: CreateAppOptions) {
  const app = express()
  
  app.use(compression())
  
  app.use(requestContextMiddleware)

  const router = express.Router()
  
  function useMiddleware () {
    const { modules, resolveController } = resolveRootModule(options.bootstrap)

    modules.forEach((x, i) => {
      const { fn, resolvePrefix, resolveRoutes, withOutputCache, resolveMiddleware, injectedMiddleware } = resolveController(x.controller)
      const middlewares = resolveMiddleware()
      if (x.view) {
        const allMiddleware = [...middlewares, ...injectedMiddleware(true)]
        router.get(x.path, allMiddleware, async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
          try {
            const render = function(data: any) {
              const App = options.bootstrap as React.ComponentType<RootModuleProps>
              const getInitialState = () => ({[x.name]: data})
              modules[i].getInitialState = getInitialState
              const html = renderToString(
                <App initialState={getInitialState()} path={req.url}>
                  {createApp(modules)}
                </App>
              )
              return renderFullPage(html, getInitialState())
            }
            const page = await withOutputCache<string>(x.cacheKey, x.outputCache || 0, async () => {
              const data = await fn<any>(req, res, next)
              return render(data)
            })
            
            res.send(page)
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