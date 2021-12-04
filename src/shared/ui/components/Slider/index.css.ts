import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { globalThemeVariables, rectangle } from '@/shared/ui/index.css';

export const size = createVar();

export const sliderContainer = style({
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    margin: globalThemeVariables.padding.normal,
});

export const sliderBackground = recipe({
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
            primary: {
                backgroundColor: globalThemeVariables.button.background.primary,
            },
        },
    },
    base: {
        position: 'relative',
        width: '100%',
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
                borderRadius: globalThemeVariables.size.s,
            },
            normal: {
                borderRadius: globalThemeVariables.size.normal,
            },
            l: {
                borderRadius: globalThemeVariables.size.l,
            },
        },
        color: {
            primary: {
                backgroundColor: globalThemeVariables.button.background.primary,
            },
        },
    },
    base: {
        vars: {
            '--slider-scroll-width': '50%',
        },
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        width: 'var(--slider-scroll-width)',
        minWidth: 'fit-content',
    },
    defaultVariants: {
        size: 's',
        color: 'primary',
    },
});

export const sliderAnchor = recipe({
    variants: {
        size: {
            s: [rectangle['s']],
            normal: [rectangle['normal']],
            l: [rectangle['l']],
        },
    },
    base: {
        borderRadius: '50%',
        background: 'white',
    },
    defaultVariants: {
        size: 's',
    },
});
