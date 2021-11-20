export type Size = 'xs' | 's' | 'normal' | 'l' | 'xl';

export interface BaseComponentProps {
    className?: string;
    classes?: (`bordered` | `size-${Size}` | `rectangle-size-${Size}` | 'rounded' | 'button')[];
}

export type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export const defaultThemeVariables = {
    layer: {
        color: {
            primary: {
                0: 'yellow',
                1: 'blue',
            },
            secondary: {
                0: 'red',
                1: 'brown',
            },
        },
        background: {
            0: 'black',
            1: 'gray',
        },
        border: {
            0: 'solid 1px red',
            1: 'solid 2px black',
        },
        shadow: {
            0: 'none',
            1: 'none',
        },
    },
    button: {
        background: {
            primary: '',
            submit: '',
            danger: '',
            disabled: '',
            focused: '',
        },
        color: {
            primary: '',
            submit: '',
            danger: '',
            disabled: '',
            focused: '',
        },
        border: {
            primary: '',
            submit: '',
            danger: '',
            disabled: '',
            focused: '',
        },
        shadow: {
            primary: '',
            submit: '',
            danger: '',
            disabled: '',
            focused: '',
        },
    },
    border: {
        radius: '5px',
        color: {
            focus: 'rgb(194, 194, 19)',
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
        m: '9px',
        b: '12px',
    },
    font: {
        family: { main: "'Roboto', sans-serif", special: "'Press Start 2P', cursive" },
    },
};

export type ThemeVariableProps = DeepPartial<typeof defaultThemeVariables>;
