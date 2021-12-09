import { configureStore } from 'lib'
import { Provider } from 'react-redux'
import { Module, InitialRenderProps, RootModuleProps } from 'jshero-core'
import React from 'react'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule extends React.Component<RootModuleProps, any> {
  static getInitialProps(ctx: InitialRenderProps) {
    const { App, initialState, render } = ctx
    const store = configureStore(initialState)

    const initialProps = render(() => (
      <Provider store={store}>
        <App />
      </Provider>
    ))
    return {
      ...initialProps,
      initialState: store.getState()
    }
  }
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