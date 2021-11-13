# JSHERO 
## SEO FRIENDLY REACT FRAMEWORK

Developing seo friendly (ssr) applications with React.js can be difficult without using a framework. This project saves you from complex webpack configurations and allows you to develop with Typescript, create modules in MVC architecture and also extend the Express server.

# JSHERO CLI
# Global install (required)
```
npm install --global jshero-cli
```
# Currently available cli commands
```
// app generate command
jshero -i app

// module generate command
jshero -m module_name: 
```

# Create app
```
jshero -i app

// redux template
jshero -i app -t redux

cd app
```

# Run as development mode
```
npm run dev
```

# Run as prodution mode
```
npm run start
```

# Run for production build
```
npm run build
```

# Modules
jshero has a modular architecture. So let's learn to create module.

# Create a module with cli command
```
jshero -m hero 

// with redux template
jshero -m hetro -t redux
```


```js

import { Module } from 'jshero-core'
import { View } from './view'
import { HeroController } from './controller'
import { reducer } from './reducer'

@Module({
  controller: HeroController,
  name: 'hero' as const,
  reducer: reducer,
  view: View,
  exact: true,
  path: '/hero',
  // outputCache: 30, optional output caching
})
export class HeroModule {}

```

# 💡 Root Module must be registered in order for the created module to be used in the application.

```javascript
import { Module } from 'jshero-core'
import { configureStore } from 'lib'
import { HeroModule } from './hero'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule,
    HeroModule
  ],
  configureStore: configureStore
})
export class RootModule {}
```

> lets open hero page localhost:3000/hero

> lets open hero api localhost:3000/api/hero



