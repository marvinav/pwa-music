import { style } from '@vanilla-extract/css';

import { globalThemeVariables as globalThemeVariables } from '../themes/theme.css';

export const navlink = style({
    cursor: 'pointer',
    selectors: {
        '&.selected': {
            color: globalThemeVariables.button.color.focused,
        },
    },
});
