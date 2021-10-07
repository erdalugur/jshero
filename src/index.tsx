import 'reflect-metadata'
import { createBrowserApp } from './platform/browser'
import { RootModule } from './modules'

createBrowserApp({
  bootstrap: RootModule
})