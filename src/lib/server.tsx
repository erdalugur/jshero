import './polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { getInjectionsPerRequest, Injector, resolvePrefix, resolveRoutes, resolveViewHandler, resolveBootstrap } from 'jshero-core'
import { createApp } from './main'
import expres from 'express'
import fs from 'fs'
import { CreateAppOptions } from '../types'
import webpack from 'webpack'

const router = expres.Router()

async function createAsset (): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development'){
      console.log(`application running development mode`)
      const configFactory = require(global.resolveApp('config/webpack.config.js'))
      const config = configFactory('development', 'browser')
      const compiler = webpack(config);
      compiler.outputFileSystem = fs;

      compiler.run((e, stats) => {
        if(e){
          return reject(e)
        } else {
          resolve(true)
        }
      })
    }
    resolve(true)
  })
}

const staticPath = global.resolveApp('build/browser')
export async function createServer (options: CreateAppOptions) {
  await createAsset()
  function useMiddeware () {
    const { modules, reducers, configureStore } = resolveBootstrap(options.bootstrap)

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
          const template = fs.readFileSync(`${staticPath}/index.html`, { encoding: 'utf-8'})
          return template
          .replace('<title></title>', initialState?.meta?.title || '')
          .replace('<style id="server-side-styles">', `
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
  return { useMiddeware, staticPath }
}