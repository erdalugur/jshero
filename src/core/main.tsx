import React from 'react'
import { Switch, Route} from 'react-router-dom'
import { getModules } from './utils'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'

export function createApp (store: Store<any, AnyAction>){
  const browserModules = getModules().filter(x => x.view).map(x => ({
    path: x.path,
    exact: x.exact,
    component: x.view
  }))
  return (
    <Provider store={store}>
      <Switch>
        {browserModules.map(({component: Component, ...x}) => (
          <Route key={x.path} {...x}>
            <Component />
          </Route>
        ))}
      </Switch>
    </Provider>
  )
}