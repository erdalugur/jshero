import { Module, RootModuleProps } from 'jshero-core'
import { configureStore } from 'lib'
import React from 'react'
import { HomeModule } from './home'
import { Provider } from 'react-redux'

@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule extends React.Component<RootModuleProps, any> {
  render () { 
    const { App, initialState } = this.props
    const store = configureStore(initialState)
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
