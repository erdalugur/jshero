import React from 'react'
import { Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { AppModule } from 'jshero-core'

export function createApp (store: Store<any, AnyAction>, modules: AppModule[]){
  return (
    <Provider store={store}>
      <Switch>
        {modules.map(({view: Component, ...x}) => (
          <Route key={x.path} {...x}>
            <Component />
          </Route>
        ))}
      </Switch>
    </Provider>
  )
}