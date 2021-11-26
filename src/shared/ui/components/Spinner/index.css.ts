import { keyframes, style } from '@vanilla-extract/css';

export const spinner = style({
    position: 'relative',
    alignSelf: 'center',
    display: 'flex',
});

const keyframe = keyframes({
    '0%': {
        transform: 'scale(0)',
    },
    '100%': {
        transform: 'scale(1)',
    },
});

export const spinnerDiv = style({
    width: '13px',
    height: '13px',
    borderRadius: '50%',
    background: '#fff',
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
    selectors: {
        '&:nth-child(1)': {
            animation: `${keyframe} 0.6s infinite`,
        },
        '&:nth-child(2)': {
            animation: `${keyframe} 0.6s infinite`,
        },
        '&:nth-child(3)': {
            animation: `${keyframe} 0.6s infinite`,
        },
        '&:nth-child(4)': {
            animation: `${keyframe} 0.6s infinite`,
        },
    },
});
