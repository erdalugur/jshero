import express from 'express'
import { createServer } from './lib/server'
import { RootModule } from './modules'
import compression from 'compression'

async function Bootstrap () {
  
  const app = express()
  app.use(compression())
  
  const { useMiddeware, staticPath } = await createServer({
    bootstrap: RootModule
  })
  
  app.get('*.*', express.static(staticPath))
  
  app.use(useMiddeware())
  
  const port = process.env['PORT'] || 3000

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

}

Bootstrap()