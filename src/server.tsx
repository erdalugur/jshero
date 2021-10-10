
import { createServer } from './platforms/server'
import express from 'express'
import { RootModule } from './modules'

async function Bootstrap () {
  
  const app = express()
  
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