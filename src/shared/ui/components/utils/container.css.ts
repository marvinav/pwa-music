import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
    base: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        gap: '0.5rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        wordBreak: 'break-all',
        selectors: {
            '&:first-child': {
                paddingTop: '0.5rem',
            },
            '&:last-child': {
                paddingBottom: '0.5rem',
            },
        },
    },
    variants: {
        align: {
            center: {
                alignItems: 'center',
                '@media': {
                    'screen and (max-width: 600px)': {
                        alignItems: 'stretch',
                    },
                },
            },
        },
    },
});
