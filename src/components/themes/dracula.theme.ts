import { GlobalThemeContract } from './theme.css';

export const draculaTheme: GlobalThemeContract = {
    layer: {
        color: {
            primary: {
                0: '#f8f8f2',
                1: '#f8f8f2',
            },
            secondary: {
                0: '#6272a4',
                1: '#6272a4',
            },
        },
        background: {
            0: '#282a36',
            1: '#343746',
        },
        border: {
            0: 'solid 1px #6272a4',
            1: 'solid 1px #6272a4',
        },
        shadow: {
            0: 'none',
            1: 'none',
        },
    },
    button: {
        background: {
            primary: '#6272a4',
            submit: '#50fa7b',
            danger: '#ff5555',
            disabled: '#191A21',
            focused: '#44335a',
        },
        color: {
            primary: '#f8f8f2',
            submit: '#f8f8f2',
            danger: '#f8f8f2',
            disabled: '#6272a4',
            focused: '#ff5555',
        },
        border: {
            primary: '#6272a4',
            submit: '#379726',
            danger: '#7b1919',
            disabled: '#3b2121',
            focused: '#50fa7b',
        },
        shadow: {
            primary: 'none',
            submit: 'none',
            danger: 'none',
            disabled: 'none',
            focused: 'none',
        },
    },
    size: {
        xs: '8px',
        s: '16px',
        normal: '32px',
        l: '64px',
        xl: '128px',
    },
    padding: {
        s: '6px',
        normal: '9px',
        l: '12px',
    },
    font: {
        family: { main: "'Roboto', sans-serif", special: "'Press Start 2P', cursive" },
    },
};
