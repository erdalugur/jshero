
import { createServer } from 'jshero-platform/server'
import express from 'express'
import { RootModule } from './modules'

async function Bootstrap () {
  
  const app = express()
  
  const { useMiddeware } = await createServer({
    bootstrap: RootModule
  })

  app.use(useMiddeware())
  
  const port = process.env['PORT'] || 5000

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

}

Bootstrap()