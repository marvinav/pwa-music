import { style } from '@vanilla-extract/css';
import { rounded } from '../index.css';

// [data-title]:after {
//     @include rounded;
//     @include layer-0;
//     @include bordered;
// }

export const tooltip = style([
    {
        selectors: {
            '[data-title]': {
                position: 'relative',
            },
            '[data-title]:hover:after': {
                opacity: '1',
                transition: 'all 0.1s ease 0.5s',
                visibility: 'visible',
            },
            '[data-title]:after': {
                content: 'attr(data-title)',
                position: 'absolute',
                whiteSpace: 'nowrap',
                opacity: 0,
                zIndex: 99999,
                visibility: 'hidden',
            },
        },
    },
    rounded,
]);
