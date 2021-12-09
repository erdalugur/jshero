import { Helmet } from "react-helmet"
import { resolveApp, readHtml } from './utils'
import { RootModuleType, RenderResult, CombinedAppModule } from '../types'
import { Common } from '../main'
import { renderToString } from 'react-dom/server'
import React from "react"

const staticPath = resolveApp('build/browser')
const template = readHtml(staticPath)
interface RenderProps {
  data: any
  modules: CombinedAppModule[]
  module: CombinedAppModule
  bootstrap: RootModuleType
}

export async function renderModule ({ module, modules, data, bootstrap }:RenderProps) {
  const initialState = {[module.name]: data}
  const App = () => <Common modules={modules} pageState={data} url={module.path}/>
  const render = (App: any) => ({ html: renderToString(<App /> ), css: '', initialState }) as RenderResult
  async function getInitialProps () {
    if (bootstrap.getInitialProps) {
      return bootstrap.getInitialProps({ App, initialState, render })
    }
    return Promise.resolve(render(App))
  }
  const { html, css, initialState: state } = await getInitialProps()


  const helmet = Helmet.renderStatic();
  const regexp = / data-react-helmet="true"/g
  const htmlTag = helmet.htmlAttributes.toString().replace(regexp, ''),
  head = [
    helmet.title.toString().replace(regexp, ''), 
    helmet.meta.toString().replace(regexp, ''),
    helmet.style.toString().replace(regexp, ''),
    helmet.link.toString().replace(regexp, ''),
  ].join(''),
  body = helmet.bodyAttributes.toString().replace(regexp, ''),
  script = helmet.script.toString().replace(regexp, '');

  return template
  .replace('<html', `<html ${htmlTag}`)
  .replace('</head>', `${head}</head>`)
  .replace('</head>', css ? `<style type="text/css" id="server-side-styles">${css}</style></head>` : '</head>')
  .replace('<body', `<body ${body}`)
  .replace('<div id="root"></div>', `<div id="root">${html}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(
      /</g,
      '\\u003c'
    )}
    window.__INITIAL_MODULE__ = '${module.name}'
  </script>
  `)
  .replace('</body>', `${script}</body>`)
}