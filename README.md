<h1 style="text-align: center"> JSHERO SEO FRIENDLY REACT FRAMEWORK</h1>
<p style="text-align: center">Developing seo friendly (ssr) applications with React.js can be difficult without using a framework. This project saves you from complex webpack configurations and allows you to develop with Typescript, create modules in MVC architecture and also extend the Express server.</p>


> <p style="font-weight: bold;">Global install (required)</p>

```
npm install --global jshero-cli
```
> <p style="font-weight: bold;">Currently available cli commands</p>
```
// app generate command
jshero -i app

// module generate command
jshero -m module_name: 
```

> <p style="font-weight: bold;">Create application with project template</p>

```
// simple template
jshero -i app

// redux template
jshero -i app -t redux

// material-ui template
jshero -i app -t material-ui

cd app
```

> <p style="font-weight: bold;">Run as development mode</p>

```
npm run dev
```

> <p style="font-weight: bold;">Run as prodution mode</p>

```
npm run start
```

> <p style="font-weight: bold;">Create a production build</p>

```
npm run build
```

> <p style="font-weight: bold;">Modules</p>

- jshero has a modular architecture. So let's learn to create module.

> <p style="font-weight: bold;">Create a module with cli command</p> 
```
// simple application module
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
  view: View,
  exact: true,
  path: '/hero',
  // outputCache: 30, optional output caching
})
export class HeroModule {}

```

> Root Module must be registered in order for the created module to be used in the application.

```javascript
import { Module } from 'jshero-core'
import { HeroModule } from './hero'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule,
    HeroModule
  ]
})
export class RootModule {}
```

> lets open hero page
- http://localhost:3000/hero

> lets open hero api 
- http://localhost:3000/api/hero



