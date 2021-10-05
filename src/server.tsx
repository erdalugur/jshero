
import { useMiddeware } from './core/server'
import express from 'express'
import path from 'path'

function Bootstrap () {

  const app = express()

  const staticFolder = path.resolve(process.cwd(), 'build/output')

  app.get('*.*', express.static(staticFolder, { maxAge: '1y' }))

  app.use(useMiddeware())
  
  app.listen(5000, () => {
    console.log('http://localhost:5000')
  })

}

Bootstrap()