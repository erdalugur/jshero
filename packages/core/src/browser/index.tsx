import { resolveRootModule } from '../resolver'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { Common } from '../main'
import { CreateAppOptions, RootModuleProps } from '../types'
import { BrowserRouter } from 'react-router-dom'

export function createBrowserApp (options: CreateAppOptions) {
  const { modules } = resolveRootModule(options.bootstrap)
  const Main = options.bootstrap as React.ComponentType<RootModuleProps>
  const state = window['__INITIAL_STATE__'] || {}
  const page = (window['__INITIAL_MODULE__'] || '') as string

  function App () {
    return (
      <div suppressHydrationWarning={true}>
        <BrowserRouter>
          <Common modules={modules} pageState={state[page]}/>
        </BrowserRouter>
      </div>
    )
  }
  render(
    <Main 
      module={page}
      path={window.location.pathname} 
      initialState={state} 
      App={App} 
    />, 
    document.querySelector('#root'))
}