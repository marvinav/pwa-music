import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { globalThemeVariables } from '@/shared/ui/index.css';

export const size = createVar();

export const sliderContainer = recipe({
    variants: {
        size: {
            s: {
                height: globalThemeVariables.size.s,
                borderRadius: globalThemeVariables.size.s,
            },
            normal: {
                height: globalThemeVariables.size.s,
                borderRadius: globalThemeVariables.size.normal,
            },
            l: {
                height: globalThemeVariables.size.s,
                borderRadius: globalThemeVariables.size.l,
            },
        },
        color: {
            primary: {},
        },
    },
    base: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultVariants: {
        size: 's',
        color: 'primary',
    },
});
// TODO: change slider color
export const sliderScroll = recipe({
    variants: {
        size: {
            s: {
                vars: { '--border-radius': globalThemeVariables.size.s },
                height: globalThemeVariables.size.s,
            },
            normal: {
                vars: { '--border-radius': globalThemeVariables.size.s },
                height: globalThemeVariables.size.normal,
            },
            l: {
                vars: { '--border-radius': globalThemeVariables.size.s },
                height: globalThemeVariables.size.l,
            },
        },
        color: {
            primary: {
                backgroundColor: globalThemeVariables.button.background.primary,
            },
        },
    },
    base: {
        width: '100%',
        borderRadius: 'var(--border-radius)',
        WebkitAppearance: 'none',
        overflow: 'hidden',
        background: 'transparent',
        selectors: {
            '&::-webkit-slider-thumb': {
                WebkitAppearance: 'none',
                width: '0',
                height: '0',
                background: 'darkred',
                cursor: 'pointer',
                boxShadow: '-100vw 0 0 100vw red',
            },
            '&:focus': {
                outline: 'none',
            },
            '&::-ms-track': {
                width: '100%',
                cursor: 'pointer',
                background: 'transparent',
                borderColor: 'transparent',
                borderWidth: '16px 0',
                color: 'transparent',
            },
            '&::-webkit-slider-runnable-track': {
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                background: '#3071a9',
                border: '0.2px solid #010101',
                borderRadius: 'var(--border-radius)',
            },
            '&:focus::-webkit-slider-runnable-track': {
                background: '#367ebd',
            },
            '&::-moz-range-track': {
                width: '100%',
                cursor: 'pointer',
                background: '#3071a9',
                border: '0.2px solid #010101',
                borderRadius: 'var(--border-radius)',
            },
            '&::-moz-range-thumb': {
                width: '0',
                height: '0',
                boxShadow: '-100vw 0 0 100vw red',
                cursor: 'pointer',
                borderRadius: 'var(--border-radius)',
            },
            '&::-ms-thumb': {
                width: '0',
                height: '0',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
            },
            '&::-ms-fill-lower': {
                background: 'red',
            },
            '&::-ms-ticks-after': {
                display: 'none',
            },
            '&::-ms-ticks-before': {
                display: 'none',
            },
        },
    },
    defaultVariants: {
        size: 's',
        color: 'primary',
    },
});

export const scrollWidthVariable = createVar();

export const sliderScrollBackground = style({
    width: 'var(--slider-scroll-background-width)',
});
