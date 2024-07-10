import { createTheme, ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#006FEE',
      light: '#cce3fd',
      dark: '#004493',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#7828c8',
      light: '#e4d4f4',
      dark: '#481878',
      contrastText: '#fafafa',
    },
    background: {
      default: '#000000',
      paper: '#18181b',
    },
    divider: '#27272a',
    text: {
      secondary: '#d4d4d8',
      primary: '#fafafa',
      disabled: '#52525b',
    },
    error: {
      main: '#f31260',
      light: '#fdd0df',
      dark: '#920b3a',
      contrastText: '#fafafa',
    },
    warning: {
      main: '#f5a524',
      light: '#fdedd3',
      dark: '#936316',
      contrastText: '#18181b',
    },
    info: {
      main: '#006FEE',
      light: '#cce3fd',
      dark: '#004493',
      contrastText: '#fafafa',
    },
    success: {
      main: '#17c964',
      light: '#d1f4e0',
      dark: '#0e793c',
      contrastText: '#18181b',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
}

const theme = createTheme({
  ...createTheme(),
  ...themeOptions,
})

export default theme
