import { createGlobalThemeContract } from '@vanilla-extract/css';
import type { MapLeafNodes, CSSVarFunction } from '@vanilla-extract/private';

type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export const globalThemeContract = createGlobalThemeContract(
    {
        layer: {
            color: {
                primary: {
                    0: null as string,
                    1: null as string,
                },
                secondary: {
                    0: null as string,
                    1: null as string,
                },
            },
            background: {
                0: null as string,
                1: null as string,
            },
            border: {
                0: null as string,
                1: null as string,
            },
            shadow: {
                0: null as string,
                1: null as string,
            },
        },
        button: {
            background: {
                primary: null as string,
                submit: null as string,
                danger: null as string,
                disabled: null as string,
                focused: null as string,
            },
            color: {
                primary: null as string,
                submit: null as string,
                danger: null as string,
                disabled: null as string,
                focused: null as string,
            },
            border: {
                primary: null as string,
                submit: null as string,
                danger: null as string,
                disabled: null as string,
                focused: null as string,
            },
            shadow: {
                primary: null as string,
                submit: null as string,
                danger: null as string,
                disabled: null as string,
                focused: null as string,
            },
        },
        size: {
            xs: null as string,
            s: null as string,
            normal: null as string,
            l: null as string,
            xl: null as string,
        },
        padding: {
            s: null as string,
            normal: null as string,
            l: null as string,
        },
        font: {
            family: { main: null as string, special: null as string },
        },
    },
    (_value, path) => path.join('-'),
);

export const globalThemeVars = globalThemeContract as GlobalThemeContract;

export type GlobalThemeVars = DeepPartial<MapLeafNodes<typeof globalThemeContract, CSSVarFunction>>;
export type GlobalThemeContract = DeepPartial<MapLeafNodes<typeof globalThemeContract, string>>;
