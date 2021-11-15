import { createServer } from '../../../packages/core/lib/server'
import { RootModule } from 'modules'

async function Bootstrap () {
  
  const { app, useAppMiddleware, useExceptionMiddleware, useStaticMiddleware } = createServer({ bootstrap: RootModule })
  
  useAppMiddleware()

  useStaticMiddleware()
  
  useExceptionMiddleware()

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

}

Bootstrap()