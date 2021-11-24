import { style } from '@vanilla-extract/css';
import { rectangle } from '../../components/index.css';
import { globalThemeVars } from '../../components/themes/theme.css';

export const icons = style([
    {
        borderRadius: '50%',
        overflow: 'hidden',
        padding: '3px',
        boxSizing: 'border-box',
        color: 'transparent',
        selectors: {
            '&.minimize': {
                background: 'yellow',
            },
            '&.close': {
                background: 'red',
            },
            '&:hover': {
                color: 'black',
            },
        },
    },
    rectangle.s,
]);

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

export const window = style({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    justifyContent: 'center',
    gap: globalThemeVars.padding.s,
    alignItems: 'center',
    padding: globalThemeVars.padding.s,
    boxSizing: 'border-box',
    width: '450px',
    left: '50%',
    height: '450px',
    top: '50%',
    transform: 'translate(-50%, -50%)',
});
