// @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto&display=swap');

import { style } from '@vanilla-extract/css';
import { globalThemeVars } from './themes/theme.css';
import { Size } from './types';

type PaddinSize = '0' | 's' | 'normal' | 'l';

const sizes: PaddinSize[] = ['0', 's', 'normal', 'l'];
const padding = {} as Record<PaddinSize, string>;
const margin = {} as Record<PaddinSize, string>;

sizes.map((x) => {
    padding[x] = style({ padding: x === '0' ? '0' : globalThemeVars.padding[x] });
    margin[x] = style({ padding: x === '0' ? '0' : globalThemeVars.padding[x] });
});

export const rounded = style({
    borderRadius: '5px',
});

export { padding, margin };

export const mainFont = style({
    fontFamily: globalThemeVars.font.family.main,
});

export const specialFont = style({
    fontFamily: globalThemeVars.font.family.special,
});

const recSizes: Size[] = ['xs', 's', 'normal', 'l', 'xl'];

const rectangle = {} as Record<Size, string>;

recSizes.forEach((x) => {
    rectangle[x] = style({
        width: globalThemeVars.size[x],
        height: globalThemeVars.size[x],
    });
});

export { rectangle };
// // Layers

// .layer-0 .shine-shadow,
// .depth-0 .shine-shadow {
//     * {
//         filter: drop-shadow(3px 3px var(--background-color));
//     }
// }

// .layer-1 .shine-shadow,
// .depth-1 .shine-shadow {
//     filter: drop-shadow(3px 3px var(--background-color-color));
// }

// .layer-0,
// .depth-0 {
//     &.bordered {
//         border: var(--layer-border-0);
//         box-shadow: var(--layer-shadow-0);
//     }
// }

// .layer-1,
// .depth-1 {
//     &.bordered {
//         border: var(--layer-border-1);
//         box-shadow: var(--layer-shadow-1);
//     }
// }
