import { Module, RootModuleProps } from 'jshero-core'
import React from 'react'
import { AboutModule } from './about'
import { HomeModule } from './home'

@Module({
  providers: [
    HomeModule,
    AboutModule
  ]
})
export class RootModule extends React.Component<RootModuleProps, any> {
  render () {
    return (
      <div suppressHydrationWarning={true}>
        {this.props.children}
      </div>
    )
  }
}
