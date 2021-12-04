import { createVar } from '@vanilla-extract/css';
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
        background: 'transparent',
        selectors: {
            '&::-webkit-slider-thumb': {
                WebkitAppearance: 'none',
                border: '1px solid #000000',
                width: '16px',
                height: '100%',
                background: '#ffffff',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
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
                borderRadius: 'var(--border-radius)',
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
                border: '1px solid #000000',
                width: '16px',
                background: '#ffffff',
                cursor: 'pointer',
                borderRadius: 'var(--border-radius)',
            },
            '&::-ms-thumb': {
                border: '1px solid #000000',
                width: '16px',
                background: '#ffffff',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
            },
        },
    },
    defaultVariants: {
        size: 's',
        color: 'primary',
    },
});
