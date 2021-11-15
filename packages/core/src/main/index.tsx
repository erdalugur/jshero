import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AppModule } from '../types'

export function Common ({ modules, pageState }: { modules: AppModule[], pageState: any }) {
  return (
    <Switch>
      {modules.map(({view: Component, ...x}) => (
        <Route key={x.path} {...x}>
          <Component {...pageState}/>
        </Route>
      ))}
    </Switch>
  )
}