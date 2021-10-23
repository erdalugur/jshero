import { createServer } from 'jshero-core/lib/server'
import { RootModule } from 'modules'

async function Bootstrap () {
  
  const app = createServer({
    bootstrap: RootModule
  })
  
  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

}

Bootstrap()