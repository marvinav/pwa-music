import { style } from '@vanilla-extract/css';
import { globalThemeVars } from '../themes/theme.css';

export const navlink = style({
    cursor: 'pointer',
    selectors: {
        '&.selected': {
            color: globalThemeVars.button.color.focused,
        },
    },
});
