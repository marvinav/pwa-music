import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const HEADINGS = 'h1, h2, h3, h4, h5, h6';

const fullScreenProp = {
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    gap: 0,
};

export const fullScreen = style(fullScreenProp);

globalStyle('body', {
    ...fullScreenProp,
});

globalStyle(`body ${HEADINGS}`, {
    fontFamily: 'var(--special-font-family)',
});

globalStyle(`body p, span`, {
    fontFamily: 'var(--main-font-family)',
});

globalStyle(`.container`, {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: '0.5rem',
    boxSizing: 'border-box',
    overflowY: 'auto',
    wordBreak: 'break-all',
});

globalStyle(`.container:first-child`, {
    paddingTop: '0.5rem',
});

globalStyle(`.container:last-child`, {
    paddingBottom: '0.5rem',
});

globalStyle(`.container.align-center`, {
    alignItems: 'center',
    '@media': {
        'screen and (max-width: 600px)': {
            alignItems: 'stretch',
        },
    },
});

globalStyle('::-webkit-scrollbar', {
    width: '8px',
});

globalStyle('::-webkit-scrollbar-track', {
    background: 'var(--background-color)',
});

globalStyle('::-webkit-scrollbar-track:hover', {
    background: 'var(--color-selected)',
});

globalStyle('::-webkit-scrollbar-thumb', {
    borderRadius: '5px',
    background: '#888',
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
    background: '#555',
});

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
