import { keyframes, style } from '@vanilla-extract/css';

const blinkBorder = keyframes({
    from: {
        borderColor: 'transparent',
    },
    to: {
        borderColor: 'var(--border-color-focus)',
    },
});

export const focusable = style({
    boxSizing: 'border-box',
    border: '3px solid transparent',
    padding: '3px',
    selectors: {
        ['&:focus']: {
            padding: '3px',
            outline: 'none',
            border: '3px solid var(--border-color-focus)',
            animationName: blinkBorder,
            animationIterationCount: 'infinite',
            animationDuration: '1s',
            animationDirection: 'normal',
        },
    },
});
