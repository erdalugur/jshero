import { Module, RootModuleProps } from 'jshero-core'
import React from 'react'
import { HomeModule } from './home'

@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule extends React.Component<RootModuleProps, any> {
  render () {
    const { App } = this.props
    return <App />
  }
}
