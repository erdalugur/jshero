import { Head, Module, RootModuleProps } from 'jshero-core'
import React from 'react'
import { HomeModule } from './home'
import { createTheme, ThemeProvider, ServerStyleSheets } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createTheme({ });

const sheets = new ServerStyleSheets()

@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule extends React.Component<RootModuleProps, any> {
  render () {
    const { App } = this.props
    const Main = () => sheets.collect(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>,
    )
    const css = sheets.toString()
    return (
      <React.Fragment>
        <Head>
          <style type="text/css" id="jss-server-side">{`${css}`}</style>
        </Head>
        <Main />
      </React.Fragment>
    )
  }
}
