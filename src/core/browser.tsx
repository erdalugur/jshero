import { resolveBootstrap } from 'jshero-core'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '../store'
import { createApp } from './main'

declare global {
  interface Window {
    __INITIAL_STATE__: any
  }
}
interface BrowserApp {
  bootstrap: object
}
export function createBrowserApp (options: BrowserApp) {
  const { modules, reducers } = resolveBootstrap(options.bootstrap)
  const store = configureStore(window.__INITIAL_STATE__ || {}, reducers)
  hydrate(
    <BrowserRouter>
      {createApp(store as any, modules)}
    </BrowserRouter>
    ,document.querySelector('#root')
  )
}