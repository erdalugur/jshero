import { resolveRootModule } from '../resolver'
import React from 'react'
import { render } from 'react-dom'
import { Common } from '../main'
import { CreateAppOptions, RootModuleProps } from '../types'

export function createBrowserApp (options: CreateAppOptions) {
  const { modules } = resolveRootModule(options.bootstrap)
  const Main = options.bootstrap as React.ComponentType<RootModuleProps>
  const state = window['__INITIAL_STATE__'] || {}
  const page = (window['__INITIAL_MODULE__'] || '') as string
  const App = () => <Common modules={modules} pageState={state[page]} url={''} />  
  render(<Main App={App} initialState={state}/>,document.querySelector('#root'))
}