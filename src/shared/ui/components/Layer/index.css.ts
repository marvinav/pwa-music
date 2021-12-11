import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeInAnimation, padding } from '../index.css';
import { globalThemeVariables as globalThemeVariables } from '../themes/theme.css';

const level = {} as { 0: string; 1: string };

for (const x of [0, 1]) {
    level[x] = style([
        {
            backgroundColor: globalThemeVariables.layer.background[x],
            color: globalThemeVariables.layer.color.primary[x],
            margin: 0,
        },
        padding.s,
    ]);
}

export const layer = recipe({
    variants: {
        level,
        rounded: {
            true: {
                borderRadius: '5px',
            },
        },
        fadeIn: {
            true: {
                animation: fadeInAnimation,
            },
        },
    },
    base: {
        zIndex: 10_000,
    },
    defaultVariants: {
        level: 0,
    },
});
