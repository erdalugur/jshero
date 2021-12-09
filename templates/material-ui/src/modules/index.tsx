import { Module, InitialRenderProps } from 'jshero-core'
import React from 'react'
import { HomeModule } from './home'
import { ThemeProvider, ServerStyleSheets } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from 'lib'
@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule extends React.Component<InitialRenderProps, any> {
  static getInitialProps(ctx: InitialRenderProps) {
    const sheets = new ServerStyleSheets()
    const { App, initialState, render } = ctx
    const initialProps = render(() => sheets.collect(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    ))
    return {
      ...initialProps,
      css: sheets.toString(),
      initialState
    }
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#server-side-styles');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }
  
  render () {
    const { App } = this.props
    return(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    )
  }
}