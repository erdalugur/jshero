import './polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { resolveRootModule } from '../resolver'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { Helmet } from "react-helmet"
import { createApp } from '../main'
import { CreateAppOptions } from '../types'
import compression from 'compression'

function resolveApp (relativePath: string) {
  return path.join(path.resolve(process.cwd()), relativePath)
}


function createRenderer (url: string, store: any, modules: any[]) {
  const sheets = new SheetsRegistry()
  const markup = renderToString(
    <JssProvider registry={sheets}>
      <StaticRouter location={url}>
        { createApp(store, modules)}
      </StaticRouter>
    </JssProvider>
  )

  return {
    render (){
      const template = fs.readFileSync(`${staticPath}/index.html`, { encoding: 'utf-8'})
      const helmet = Helmet.renderStatic();
      const regexp = / data-react-helmet="true"/g
      const html = helmet.htmlAttributes.toString().replace(regexp, ''),
      head = [
        helmet.title.toString().replace(regexp, ''), 
        helmet.meta.toString().replace(regexp, ''),
        helmet.link.toString().replace(regexp, '')
      ].join(''),
      body = helmet.bodyAttributes.toString().replace(regexp, ''),
      script = helmet.script.toString().replace(regexp, '');
    
      return template
      .replace('<html', `<html ${html}`)
      .replace('</head>', `${head}</head>`)
      .replace('</head>', `<style type="text/css" id="server-side-styles">${sheets.toString()}</style></head>`)
      .replace('<body', `<body ${body}`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(
          /</g,
          '\\u003c'
        )}
      </script>
      `)
      .replace('</body>', `${script}</body>`)
      }
  }
}
const staticPath = resolveApp('build/browser')

export async function createServer (options: CreateAppOptions) {
  const app = express()
  app.use(compression())
  const router = express.Router()
  function useMiddeware () {
    const { modules, reducers, configureStore, resolveController } = resolveRootModule(options.bootstrap)

    modules.forEach(x => {
      const { fn, resolvePrefix, resolveRoutes, withOutputCache } = resolveController(x.controller)
      if (x.view) {
        router.get(x.path, async (req: any, res: any, next: any) => {
          try {
            const cacheKey = `__${x.path}__${x.name}__`
            const result = await withOutputCache(cacheKey, x.outputCache || 0, async () => {
              const result = await fn(req, res, next)
              const store = configureStore({[x.name]: result }, reducers)
              const { render } = createRenderer(req.url, store, modules)
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
        router[requestMethod](prefix + path, async (req: any, res: any, next: any) => {
          try {
            const result = await fn(req, res, next, methodName)
            res.json(result)
          } catch (error) {
            next(error)
          }
        })
      })
    })
    return router
  }
  app.use(useMiddeware())
  app.get('*.*', express.static(staticPath))

  return app
}