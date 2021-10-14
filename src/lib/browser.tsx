import { resolveRootModule } from 'jshero-core'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createApp } from './main'
import { CreateAppOptions } from 'types'

export function createBrowserApp (options: CreateAppOptions) {
  const { modules, reducers, configureStore } = resolveRootModule(options.bootstrap)
  const store = configureStore(window.__INITIAL_STATE__ || {}, reducers)
  hydrate(
    <BrowserRouter>
      {createApp(store as any, modules)}
    </BrowserRouter>
    ,document.querySelector('#root'), () => {
      const ssStyles = document.querySelector('#server-side-styles')
      ssStyles?.parentNode?.removeChild(ssStyles)
    }
  )
}