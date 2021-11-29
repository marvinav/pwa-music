import { style } from '@vanilla-extract/css';

import { padding } from '../index.css';
import { globalThemeVariables as globalThemeVariables } from '../themes/theme.css';

const layer = {} as { 0: string; 1: string };

for (const x of [0, 1]) {
    layer[x] = style([
        {
            backgroundColor: globalThemeVariables.layer.background[x],
            color: globalThemeVariables.layer.color.primary[x],
            margin: 0,
        },
        padding.s,
    ]);
}

export { layer };
