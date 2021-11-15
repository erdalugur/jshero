import { createBrowserApp } from '../../../packages/core/lib/browser'
import { RootModule } from 'modules'
createBrowserApp({
  bootstrap: RootModule
})