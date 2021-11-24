import { style } from '@vanilla-extract/css';
import { padding } from '../index.css';
import { globalThemeVars } from '../themes/theme.css';

const layer = {} as { 0: string; 1: string };

[0, 1].forEach((x) => {
    layer[x] = style([
        {
            backgroundColor: globalThemeVars.layer.background[x],
            color: globalThemeVars.layer.color.primary[x],
            margin: 0,
        },
        padding.s,
    ]);
});

export { layer };
