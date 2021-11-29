import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { mediaQueries, rectangle, rounded } from '../../components/index.css';
import { globalThemeVariables as globalThemeVariables } from '../../components/themes/theme.css';

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
    gap: globalThemeVariables.padding.s,
    alignItems: 'center',
});

export const topBar = style({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
});

export const bottomBar = style({
    '@media': {
        [`${mediaQueries.s}`]: {
            maxHeight: globalThemeVariables.size.s,
        },
    },
    display: 'flex',
    width: '100%',
    maxHeight: globalThemeVariables.size.normal,
    height: '100%',
    padding: '0',
    margin: '0',
});

export const window = style([
    {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        justifyContent: 'center',
        gap: globalThemeVariables.padding.s,
        alignItems: 'center',
        padding: globalThemeVariables.padding.s,
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
