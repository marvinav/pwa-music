import { style } from '@vanilla-extract/css';

export const nav = style({
    display: 'flex',
    position: 'sticky',
    top: '0px',
    left: 0,
    justifyContent: 'center',
    gap: '1em',
    alignItems: 'center',
    padding: '5px',
    boxSizing: 'border-box',
});

export const navLink = style({
    fontSize: '1.5em',
});
