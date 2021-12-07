import React from 'react'
import { Switch, Route, BrowserRouter, StaticRouter } from 'react-router-dom'
import { AppModule } from '../types'

export function Common ({ modules, pageState, url }: { modules: AppModule[], pageState: any, url: string }) {
  function renderModules () {
    return (
      <Switch>
        {modules.map(({view: Component, ...x}) => (
          <Route key={x.path} {...x}>
            <Component {...pageState}/>
          </Route>
        ))}
      </Switch>
    )
  }

  const RouterComponent = (process.env['BROWSER'] ? BrowserRouter : StaticRouter) as any
  return (
    <RouterComponent location={url}>
      {renderModules()}
    </RouterComponent>
  )
}