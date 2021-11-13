import React from 'react'
import { Switch, Route, BrowserRouter, StaticRouter} from 'react-router-dom'
import { CombinedAppModule } from '../types'

export function createApp (modules: CombinedAppModule[]){
  const server = process.env['BROWSER'] ? false : true
 
  function getInitialState (x: CombinedAppModule) {
    const state = x.getInitialState()
    return state && state[x.name] || {} 
  }
  const render = () => (
    <Switch>
      {modules.map(({view: Component, ...x}) => (
        <Route key={x.path} {...x}>
          <Component {...getInitialState(x)}/>
        </Route>
      ))}
    </Switch>
  )
  if (!server) {
    return (
      <BrowserRouter>
        {render()}
      </BrowserRouter>
    )
  } else {
    return (
      <StaticRouter>
        {render()}
      </StaticRouter>
    )
  }
}