import { globalStyle } from '@vanilla-extract/css';

const HEADINGS = 'h1, h2, h3, h4, h5, h6';

globalStyle('body', {
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    gap: 0,
});

globalStyle(`body ${HEADINGS}`, {
    fontFamily: 'var(--special-font-family)',
});

globalStyle(`body p, span`, {
    fontFamily: 'var(--main-font-family)',
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
