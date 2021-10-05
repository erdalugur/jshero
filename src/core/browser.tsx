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
export function createBrowserApp () {
  const store = configureStore(window.__INITIAL_STATE__ || {})
  hydrate(
    <BrowserRouter>
      {createApp(store)}
    </BrowserRouter>
    ,document.querySelector('#root')
  )
}