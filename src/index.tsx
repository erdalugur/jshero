import 'reflect-metadata'
import { createBrowserApp } from './platforms/browser'
import { RootModule } from './modules'

createBrowserApp({
  bootstrap: RootModule
})