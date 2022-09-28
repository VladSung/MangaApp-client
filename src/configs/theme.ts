import { grey } from '@mui/material/colors';
import { alpha } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {light, dark} from "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
    interface Theme {
      extPalette:{
        background: {
            primary: string
            over: string
        }
      }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        extPalette?:{
            background?: {
                primary?: string
                over?: string
            }
          };
    }
  }

const typography = {
    h1: {
        fontSize: '2.4rem',
        lineHeight: 1.5,
        fontWeight: 700,
    },
    h2: {
        fontSize: '2rem',
        lineHeight: 1.5,
        fontWeight: 700,
    },
    h3: {
        fontSize: '1.8rem',
        lineHeight: 1.5,
        fontWeight: 700,
    },
    h4: {
        fontSize: '1.5rem',
        lineHeight: 1.5,
        fontWeight: 700,
    },
    h5: {
        fontSize: '1.3rem',
        lineHeight: 1.5,
        fontWeight: 700,
    },
    h6: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 700,
    },
}
const palette = {
    primary:{
        main: '#0074ab',
    },
    secondary:{
        main: '#c13e53'
    }
}

export const lightTheme = createTheme({
    typography,
    palette: {
        ...light,
        mode: 'light',
        ...palette,
    },
});

export  const darkTheme = createTheme({
    typography,
    palette: {
        ...dark,
        mode: 'dark',
        ...palette,

    },
});

let theme = createTheme(lightTheme, {
    extPalette:{
        background: {
            primary:'#0074ab15',
            over: alpha((grey[50]), 0.6)
        }
    },
})

export {theme};
