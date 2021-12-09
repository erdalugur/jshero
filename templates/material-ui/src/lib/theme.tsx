import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({ 
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          padding: 0,
          margin:0,
          height: '100vh',
          width: '100%'
        }
      }
    }
  }
 });