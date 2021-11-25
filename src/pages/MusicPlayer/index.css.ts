import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { padding, rectangle } from '../../components/index.css';
import { globalThemeVars } from '../../components/themes/theme.css';

export const controlPanel = style([
    {
        display: 'flex',
    },
    padding.s,
]);

export const playerStateButtons = recipe({
    base: rectangle.normal,
    variants: {
        action: {
            previous: { transform: 'rotate(180deg)' },
        },
    },
});

export const playlist = style({
    vars: {
        '--duration-width': '40px',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

export const title = style({
    gridArea: 'title',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
});

export const artist = style({
    gridArea: 'artist',
    fontSize: '0.7em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
});

export const duration = style({
    gridArea: 'duration',
    justifySelf: 'center',
});

export const playlistItem = recipe({
    variants: {
        selected: {
            true: {
                backgroundColor: globalThemeVars.button.background.focused,
                color: globalThemeVars.button.color.focused,
            },
        },
    },
    base: [
        {
            userSelect: 'none',
            display: 'grid',
            gridTemplateAreas: "'title duration' 'artist duration'",
            gridTemplateColumns: `1fr var(--duration-width)`,
            alignItems: 'center',
            gap: globalThemeVars.size.xs,
            selectors: {
                '&:hover': {
                    backgroundColor: globalThemeVars.button.background.focused,
                    color: globalThemeVars.button.color.focused,
                },
            },
        },
        padding.s,
    ],
});
