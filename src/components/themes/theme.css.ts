import { createGlobalThemeContract } from '@vanilla-extract/css';
import type { MapLeafNodes } from '@vanilla-extract/private';

type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export const globalThemeContract = createGlobalThemeContract(
    {
        layer: {
            color: {
                primary: {
                    0: null,
                    1: null,
                },
                secondary: {
                    0: null,
                    1: null,
                },
            },
            background: {
                0: null,
                1: null,
            },
            border: {
                0: null,
                1: null,
            },
            shadow: {
                0: null,
                1: null,
            },
        },
        button: {
            background: {
                primary: null,
                submit: null,
                danger: null,
                disabled: null,
                focused: null,
            },
            color: {
                primary: null,
                submit: null,
                danger: null,
                disabled: null,
                focused: null,
            },
            border: {
                primary: null,
                submit: null,
                danger: null,
                disabled: null,
                focused: null,
            },
            shadow: {
                primary: null,
                submit: null,
                danger: null,
                disabled: null,
                focused: null,
            },
        },
        border: {
            radius: null,
        },
        size: {
            xs: null,
            s: null,
            normal: null,
            l: null,
            xl: null,
        },
        padding: {
            s: null,
            m: null,
            b: null,
        },
        font: {
            family: { main: null, special: null },
        },
    },
    (_value, path) => path.join('-'),
);

export type GlobalThemeContract = DeepPartial<MapLeafNodes<typeof globalThemeContract, string>>;
