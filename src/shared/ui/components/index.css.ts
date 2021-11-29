// @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto&display=swap');

import { style } from '@vanilla-extract/css';

import { globalThemeVariables as globalThemeVariables } from './themes/theme.css';
import { DeviceSize, PaddinSize, Size } from './types';

const sizes: PaddinSize[] = ['0', 's', 'normal', 'l'];

const padding = {} as Record<PaddinSize, string>;
const margin = {} as Record<PaddinSize, string>;
sizes.map((x) => {
    padding[x] = style({ padding: x === '0' ? '0' : globalThemeVariables.padding[x] });
    margin[x] = style({ padding: x === '0' ? '0' : globalThemeVariables.padding[x] });
});

export { padding, margin };

export const rounded = style({
    borderRadius: '5px',
});

export const mainFont = style({
    fontFamily: globalThemeVariables.font.family.main,
});

export const specialFont = style({
    fontFamily: globalThemeVariables.font.family.special,
});

const recSizes: Size[] = ['xs', 's', 'normal', 'l', 'xl'];
const rectangle = {} as Record<Size, string>;

for (const x of recSizes) {
    rectangle[x] = style({
        width: globalThemeVariables.size[x],
        height: globalThemeVariables.size[x],
    });
}

export { rectangle };

export const mediaQueries: Record<DeviceSize, string> = {
    s: '(min-width: 576px)',
    m: '(min-width: 768px)',
    l: '(min-width: 992px)',
    xl: '(min-width: 1200x)',
    xxl: '(min-width: 1400px)',
};

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
