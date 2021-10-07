import 'reflect-metadata'
import { createBrowserApp } from './core/browser'
import { RootModule } from './modules'

createBrowserApp({
  bootstrap: RootModule
})