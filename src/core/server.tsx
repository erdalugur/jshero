import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { getInjectionsPerRequest, Injector, resolvePrefix, resolveRoutes, resolveViewHandler, resolveBootstrap } from 'jshero-core'
import { configureStore } from '../store'
import { createApp } from './main'
import { Router } from 'express'
import fs from 'fs'
import path from 'path'

interface Middeware {
  bootstrap: object
}
export function useMiddeware (options: Middeware) {
  const { modules, reducers } = resolveBootstrap(options.bootstrap)
  const router = Router()

  const template = fs.readFileSync(`${path.resolve(process.cwd())}/build/output/index.html`, { encoding: 'utf-8'})
  function createRenderer (url: string, initialState: any) {
    const store = configureStore(initialState, reducers)
    const sheets = new SheetsRegistry()
    const html = renderToString(
      <JssProvider registry={sheets}>
        <StaticRouter location={url}>
          { createApp(store as any, modules)}
        </StaticRouter>
      </JssProvider>
    )
    return {
      render (){
        return template
        .replace('<title></title>', initialState?.meta?.title || '')
        .replace('<style type="text/css" id="server-side-styles">', `
          <style type="text/css" id="server-side-styles">
            ${sheets.toString()}
          </style>
        `)
        .replace('<div id="root"></div>', `
        <div id="root">${html}</div>
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