import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { JssProvider, SheetsRegistry } from 'react-jss'
import fs from 'fs'
import { Helmet } from "react-helmet"
import { createApp } from '../main'
import { resolveApp } from './utils'
import { AppModule } from '../types'

const staticPath = resolveApp('build/browser')
interface Renderer {
  url: string
  store: any
  modules: AppModule[]
}
export function createRenderer ({url, store, modules}: Renderer) {
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
