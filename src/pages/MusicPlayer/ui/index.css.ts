import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { padding, rectangle, globalThemeVariables } from 'shared/ui/index.css';

export const controlPanel = style([
    {
        display: 'flex',
        gap: 'inherit',
    },
    padding.s,
]);

export const playerStateButtons = recipe({
    base: style([
        rectangle.normal,
        {
            color: globalThemeVariables.button.background.primary,
        },
    ]),
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
                backgroundColor: globalThemeVariables.button.background.focused,
                color: globalThemeVariables.button.color.focused,
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
            gap: globalThemeVariables.size.xs,
            selectors: {
                '&:hover': {
                    backgroundColor: globalThemeVariables.button.background.focused,
                    color: globalThemeVariables.button.color.focused,
                },
            },
        },
        padding.s,
    ],
});

export const visualization = style({
    display: 'flex',
    width: '100%',
    height: '100px',
    gap: '1px',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
});

export const visualNode = style({
    width: '100%',
    backgroundColor: globalThemeVariables.button.color.focused,
    transition: 'height 0.5s linear',
});
