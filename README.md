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
![hero module](https://github.com/erdalugur/jshero/blob/master/docs/HeroModule.png)

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
![register module](/docs/register.png)

# 🥳 lets open hero page yourlocalhost:3000/hero

![hero page](/docs/HeroPage.png)


# 🥳 lets open hero api yourlocalhost:3000/api/hero

![hero page](/docs/HeroApi.png)



