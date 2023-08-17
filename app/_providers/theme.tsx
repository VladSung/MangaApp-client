import { experimental_extendTheme as extendTheme, responsiveFontSizes } from '@mui/material/styles';
import { Sofia_Sans } from 'next/font/google';

const sofia_Sans = Sofia_Sans({ preload: false });

declare module '@mui/material/styles' {
    interface ColorSchemeOverrides {
        darkRed: true;
    }
    interface PaletteOptions {
        gradient?: {
            start: string;
            middle?: string;
            end: string;
            gradient: string;
        };
    }
    interface Palette {
        gradient: {
            start: string;
            middle?: string;
            end: string;
            gradient: string;
        };
    }
}

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                gradient: {
                    start: '#C1365D',
                    middle: '#E75D90',
                    end: '#F281B6',
                    gradient:
                        'var(--gradient-red, linear-gradient(331deg, #C1365D 0%, #E75D90 41.15%, #F281B6 100%))',
                },
                primary: {
                    main: '#111111',
                    contrastText: '#ffff',
                },
                text: {
                    primary: '#111111',
                },
                secondary: {
                    main: '#EB8499',
                    contrastText: '#ffff',
                },
                background: {
                    default: '#ffffffb3',
                    // paper: '#cdcdcd',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#737373',
                    contrastText: '#eeeeee',
                },
                text: {
                    primary: '#eeeeee',
                },
                action: {
                    active: '#ffffffa3',
                },
                secondary: {
                    main: '#EB8499',
                },
                background: {
                    default: '#000',
                    //paper: '#111111',
                    //paper: '#1B191A',
                },

                // palette: {
                //     primary: {
                //         main: '#E02E41',
                //     },
                //     secondary: {
                //         main: '#E02E41',
                //     },
                //     background: {
                //         default: '#1B191A',
                //     },
            },
        },
    },
    typography: {
        fontFamily: `${sofia_Sans.style.fontFamily}, Roboto, sans-serif`,
        fontSize: 14,
        h1: {
            fontSize: 34.84,
        },
        h2: {
            fontSize: 29.03,
        },
        h3: {
            fontSize: 24.19,
        },
        h4: {
            fontSize: 20.16,
            fontWeight: 400,
        },
        h5: {
            fontSize: 16.8,
            fontWeight: 500,
        },
        h6: {
            fontSize: 15,
            fontWeight: 500,
        },
        button: {
            fontWeight: 400,
            fontSize: 15,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 99,
                    textTransform: 'none',
                },
            },
        },
    },
});

export default responsiveFontSizes(theme, { factor: 2 });
