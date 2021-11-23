// @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto&display=swap');

import { style } from '@vanilla-extract/css';
import { globalThemeVars } from './themes/theme.css';

type Size = '0' | 's' | 'normal' | 'l';

const sizes: Size[] = ['0', 's', 'normal', 'l'];
const padding = {} as Record<Size, string>;
const margin = {} as Record<Size, string>;

sizes.map((x) => {
    padding[x] = style({ padding: x === '0' ? '0' : globalThemeVars.padding[x] });
    margin[x] = style({ padding: x === '0' ? '0' : globalThemeVars.padding[x] });
});

export const roundedMixin = {
    borderRadius: globalThemeVars.border.radius,
};

export const rounded = style({
    ...roundedMixin,
});

// // Layers
// @mixin depth-0 {
//     background-color: var(--layer-background-0);
//     color: var(--layer-color-primary-0);
// }

// @mixin depth-1 {
//     background-color: var(--layer-background-1);
//     color: var(--layer-color-primary-1);
// }

// .depth-0 {
//     @include depth-0;
// }

// .depth-1 {
//     @include depth-1;
// }

// @mixin layer-0 {
//     @extend .depth-0;
//     @extend .padding-s;
//     @extend .margin-0;
// }

// .layer-0 {
//     @include layer-0;
// }

// @mixin layer-1 {
//     @extend .depth-1;
//     @extend .padding-s;
//     @extend .margin-0;
// }

// .layer-1 {
//     @include layer-1;
// }

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
// // Fonts

// .main-font {
//     font-family: var(--main-font-family);
// }

// .special-font {
//     font-family: var(--special-font-family);
// }

// // Rectangle sizes

// .rectangle-size-xs {
//     width: var(--size-xs);
//     height: var(--size-xs);
// }

// .rectangle-size-s {
//     width: var(--size-s);
//     height: var(--size-s);
// }

// .rectangle-size-normal {
//     width: var(--size-normal);
//     height: var(--size-normal);
// }

// .rectangle-size-l {
//     width: var(--size-l);
//     height: var(--size-l);
// }

// .rectangle-size-xl {
//     width: var(--size-xl);
//     height: var(--size-xl);
// }
