
import { useMiddeware } from './platform/server'
import express from 'express'
import path from 'path'
import fs from 'fs'
import { RootModule } from './modules'

function Bootstrap () {
  
  const app = express()

  const staticFolder = path.resolve(process.cwd(), 'build/output')

  app.get('*.*', express.static(staticFolder, { maxAge: '1y' }))

  const indexHtml = fs.readFileSync(`${staticFolder}/index.html`, { encoding: 'utf-8'})

  app.use(useMiddeware({
    bootstrap: RootModule,
    template: indexHtml
  }))
  
  app.listen(5000, () => {
    console.log('http://localhost:5000')
  })

}

Bootstrap()