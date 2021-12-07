import './polyfill'
import { resolveRootModule } from '../resolver'
import express, { Request, Response, NextFunction } from 'express'
import { CreateAppOptions, HttpRequest, HttpResponse, HttpNextFunction, RootModuleProps, CombinedAppModule } from '../types'
import compression from 'compression'
import { resolveApp } from './utils'
import { errorLogger, sendError, requestContextMiddleware } from './middleware'
import { renderFullPage } from './renderer'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { Common } from '../main'

const staticPath = resolveApp('build/browser')

export function createServer (options: CreateAppOptions) {
  const app = express()
  
  app.use(compression())
  
  app.use(requestContextMiddleware)

  const router = express.Router()
  
  function useMiddleware () {
    const Main = options.bootstrap as React.ComponentType<RootModuleProps>
    const { modules, resolveController } = resolveRootModule(Main)

    modules.forEach((x, i) => {
      const { fn, resolvePrefix, resolveRoutes, withOutputCache, resolveMiddleware, injectedMiddleware } = resolveController(x.controller)
      const middlewares = resolveMiddleware()
      if (x.view) {
        const allMiddleware = [...middlewares, ...injectedMiddleware(true)]
        router.get(x.path, allMiddleware, async (req: HttpRequest, res: HttpResponse, next: HttpNextFunction) => {
          try {
            const key: string = `_${x.path}_${x.name}_key`
            const page: string = await withOutputCache(key, x.outputCache, async () => {
              const render = function(data: any) {
                const state = {[x.name]: data}
                const App = () => <Common modules={modules} pageState={data} url={req.url}/>
                const html = renderToString(<Main module={x.name} initialState={state} path={req.url} App={App} />)
                return renderFullPage(html, state, x.name)
              }
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