import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { mediaQueries, rectangle, rounded } from '../../components/index.css';
import { globalThemeVars } from '../../components/themes/theme.css';

export const icons = recipe({
    base: [
        {
            borderRadius: '50%',
            overflow: 'hidden',
            padding: '3px',
            boxSizing: 'border-box',
            color: 'transparent',
            selectors: {
                '&:hover': {
                    color: 'black',
                },
            },
        },
        rectangle.s,
    ],
    variants: {
        action: {
            minimize: {
                background: 'yellow',
            },
            close: {
                background: 'red',
            },
        },
    },
});

export const controlButton = style({
    display: 'flex',
    gap: globalThemeVars.padding.s,
    alignItems: 'center',
});

export const topBar = style({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
});

export const window = style([
    {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        justifyContent: 'center',
        gap: globalThemeVars.padding.s,
        alignItems: 'center',
        padding: globalThemeVars.padding.s,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        '@media': {
            [`${mediaQueries.s}`]: {
                width: '80%',
                height: '80%',
                maxWidth: '450px',
                maxHeight: '450px',
            },
        },
    },
    rounded,
]);