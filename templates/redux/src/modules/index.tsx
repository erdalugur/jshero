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
    const store = configureStore(this.props.initialState)
    return (
      <div suppressHydrationWarning={true}>
        <Provider store={store}>
          {this.props.children}
        </Provider>
      </div>
    )
  }
}
