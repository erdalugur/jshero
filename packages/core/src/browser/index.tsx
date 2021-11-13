import { resolveRootModule } from '../resolver'
import React from 'react'
import { hydrate } from 'react-dom'
import { createApp } from '../main'
import { CreateAppOptions, RootModuleProps } from '../types'

export function createBrowserApp (options: CreateAppOptions) {
  const { modules } = resolveRootModule(options.bootstrap)
  const App = options.bootstrap as React.ComponentType<RootModuleProps>
  const getInitialState = () => window['__INITIAL_STATE__'] || {}
  const appModules = modules.map(x => {
    x.getInitialState = getInitialState
    return x
  })
  hydrate(
    <App 
      path={window.location.pathname}
      initialState={getInitialState()}>
      {createApp(appModules)}
    </App>
    ,document.querySelector('#root')
  )
}