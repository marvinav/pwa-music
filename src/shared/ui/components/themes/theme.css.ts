import { createGlobalThemeContract } from '@vanilla-extract/css';
import type { MapLeafNodes, CSSVarFunction } from '@vanilla-extract/private';

type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export const globalThemeContract = createGlobalThemeContract(
    {
        layer: {
            color: {
                primary: {
                    0: undefined as string,
                    1: undefined as string,
                },
                secondary: {
                    0: undefined as string,
                    1: undefined as string,
                },
            },
            background: {
                0: undefined as string,
                1: undefined as string,
            },
            border: {
                0: undefined as string,
                1: undefined as string,
            },
            shadow: {
                0: undefined as string,
                1: undefined as string,
            },
        },
        button: {
            background: {
                primary: undefined as string,
                submit: undefined as string,
                danger: undefined as string,
                disabled: undefined as string,
                focused: undefined as string,
            },
            color: {
                primary: undefined as string,
                submit: undefined as string,
                danger: undefined as string,
                disabled: undefined as string,
                focused: undefined as string,
            },
            border: {
                primary: undefined as string,
                submit: undefined as string,
                danger: undefined as string,
                disabled: undefined as string,
                focused: undefined as string,
            },
            shadow: {
                primary: undefined as string,
                submit: undefined as string,
                danger: undefined as string,
                disabled: undefined as string,
                focused: undefined as string,
            },
        },
        size: {
            xs: undefined as string,
            s: undefined as string,
            normal: undefined as string,
            l: undefined as string,
            xl: undefined as string,
        },
        padding: {
            s: undefined as string,
            normal: undefined as string,
            l: undefined as string,
        },
        font: {
            family: { main: undefined as string, special: undefined as string },
        },
    },
    (_value, path) => path.join('-'),
);

export const globalThemeVariables = globalThemeContract as GlobalThemeContract;

export type GlobalThemeVariables = DeepPartial<MapLeafNodes<typeof globalThemeContract, CSSVarFunction>>;
export type GlobalThemeContract = DeepPartial<MapLeafNodes<typeof globalThemeContract, string>>;
