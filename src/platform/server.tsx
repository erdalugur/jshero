import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { getInjectionsPerRequest, Injector, resolvePrefix, resolveRoutes, resolveViewHandler, resolveBootstrap } from 'jshero-core'
import { configureStore } from '../store'
import { createApp } from './main'
import expres from 'express'
import path from 'path'
import fs from 'fs'
import Bundler from 'parcel-bundler'

interface Middeware {
  bootstrap: object
}
console.log(process.env['NODE_ENV'])
async function createAsset (): Promise<{ html: string, staticFolder: string }> {
  const staticFolder = path.resolve(process.cwd(), 'build/output')
  let html = ''
  if (process.env['NODE_ENV'] === 'production') {
    html = fs.readFileSync(`${staticFolder}/index.html`, { encoding: 'utf-8'})
  } else {
    const devHtml = path.resolve(process.cwd(), 'src/index.html')

    const bundler = new Bundler(devHtml, {
      outDir: 'build/output',
      minify: true
    });
    const { entryAsset } = await bundler.bundle()
    html = entryAsset.generated.html
  }
  
  return { html, staticFolder }
}
export async function createServer () {
  const router = expres.Router()
  const { staticFolder, html } = await createAsset()

  router.get('*.*', expres.static(staticFolder))
  function useMiddeware (options: Middeware) {
    const { modules, reducers } = resolveBootstrap(options.bootstrap)

    function createRenderer (url: string, initialState: any) {
      const store = configureStore(initialState, reducers)
      const sheets = new SheetsRegistry()
      const markup = renderToString(
        <JssProvider registry={sheets}>
          <StaticRouter location={url}>
            { createApp(store as any, modules)}
          </StaticRouter>
        </JssProvider>
      )
      return {
        render (){
          return html
          .replace('<title></title>', initialState?.meta?.title || '')
          .replace('<style type="text/css" id="server-side-styles">', `
            <style type="text/css" id="server-side-styles">
              ${sheets.toString()}
            </style>
          `)
          .replace('<div id="root"></div>', `
          <div id="root">${markup}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(
              /</g,
              '\\u003c'
            )}
          </script>
          `)
        }
      }
    }
  

    modules.forEach(x => {
      if (x.view) {
        router.get(x.path, async (req: any, res: any) => {
          const viewHandler = await resolveViewHandler(x.controller)
          const result = await viewHandler()
          const initialState = {[x.name]: result }
          const { render } = createRenderer(req.url, initialState)
          res.send(render())
        })
      }
      // api routes
      const prefix = resolvePrefix(x.controller, x.path)
      const routes = resolveRoutes(x.controller)
      routes.forEach(({ methodName, requestMethod, path}) => {
        const instance = Injector.resolve(x.controller)
        router[requestMethod](prefix + path, async (req: any, res: any, next: any) => {
          try {
            const injections = getInjectionsPerRequest({ instance, methodName: methodName, req, res, next })
            const result = await instance[methodName](...injections)
            res.json(result)
          } catch (error) {
            next(error)
          }
        })
      })
    })
    return router
  }
  return { useMiddeware }
}