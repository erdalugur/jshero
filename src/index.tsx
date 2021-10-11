import { createBrowserApp } from './lib/browser'
import { RootModule } from './modules'
createBrowserApp({
  bootstrap: RootModule
})