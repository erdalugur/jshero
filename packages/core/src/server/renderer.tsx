import { Helmet } from "react-helmet"
import { resolveApp, readHtml } from './utils'

const staticPath = resolveApp('build/browser')
const template = readHtml(staticPath)

export function renderFullPage (markup: string, state: any, module: string) {
  const helmet = Helmet.renderStatic();
  const regexp = / data-react-helmet="true"/g
  const html = helmet.htmlAttributes.toString().replace(regexp, ''),
  head = [
    helmet.title.toString().replace(regexp, ''), 
    helmet.meta.toString().replace(regexp, ''),
    helmet.style.toString().replace(regexp, ''),
    helmet.link.toString().replace(regexp, ''),
  ].join(''),
  body = helmet.bodyAttributes.toString().replace(regexp, ''),
  script = helmet.script.toString().replace(regexp, '');

  return template
  .replace('<html', `<html ${html}`)
  .replace('</head>', `${head}</head>`)
  //.replace('</head>', `<style type="text/css" id="server-side-styles">${sheets.toString()}</style></head>`)
  .replace('<body', `<body ${body}`)
  .replace('<div id="root"></div>', `<div id="root">${markup}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(
      /</g,
      '\\u003c'
    )}
    window.__INITIAL_MODULE__ = '${module}'
  </script>
  `)
  .replace('</body>', `${script}</body>`)
}
