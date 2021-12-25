import { resolveRootModule } from '../resolver'
import React from 'react'
import { render } from 'react-dom'
import { Common } from '../main'
import { CreateAppOptions, RootModuleProps } from '../types'

export function createBrowserApp (options: CreateAppOptions) {
  const { modules } = resolveRootModule(options.bootstrap)
  const Main = options.bootstrap as React.ComponentType<RootModuleProps>
  const { props, module } = (JSON.parse(document.querySelector('#__JSHERO_DATA__')?.textContent) || { module: '', props: {}}) as ServerSideState
  const App = () => <Common modules={modules} pageState={props[module]} url={''} />  
  render(<Main App={App} initialState={props}/>,document.querySelector('#root'))
}

interface ServerSideState {
  module: string
  props: {[key: string]: any}
}