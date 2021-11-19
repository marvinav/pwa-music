export interface BaseComponentProps {
    rounded?: boolean;
    className?: string;
    size?: 'xs' | 's' | 'normal' | 'l' | 'xl';
    button?: boolean;
}

export type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export const defaultThemeVariables = {
    background: {
        color: 'black',
    },
    border: {
        color: {
            focus: 'rgb(194, 194, 19)',
            radius: '5px',
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
    color: {
        color: 'yellow',
        selected: 'rgb(82, 82, 58)',
    },
    window: {
        border: {
            color: 'rgb(158, 86, 86)',
            thick: '1px',
        },
    },
    font: {
        family: { main: "'Roboto', sans-serif", special: "'Press Start 2P', cursive" },
    },
};

export type ThemeVariableProps = DeepPartial<typeof defaultThemeVariables>;
