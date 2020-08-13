import { createMuiTheme } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

const cardsStyles = {
    color: 'white',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid transparent',
};

export const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: {
            main: '#fff',
        },
    },
    overrides: {
        MuiRadio: {
            colorPrimary: {
                color: 'white',
            },
            colorSecondary: {
                color: 'white',
            },
        },
        MuiPaper: {
            root: cardsStyles,
        },
        MuiCard: {
            root: cardsStyles,
        },
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
                body: {
                    color: 'white',
                },
            },
        },
    },
});
