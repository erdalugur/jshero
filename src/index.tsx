import 'reflect-metadata'
import { createBrowserApp } from 'jshero-platform/browser'
import { RootModule } from './modules'

createBrowserApp({
  bootstrap: RootModule
})