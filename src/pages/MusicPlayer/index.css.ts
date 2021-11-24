import { style } from '@vanilla-extract/css';
import { padding } from '../../components/index.css';
import { globalThemeVars } from '../../components/themes/theme.css';

export const controlPanel = style([
    {
        display: 'flex',
    },
    padding.s,
]);

export const previous = style({
    transform: 'rotate(180deg)',
});

export const playlist = style({
    vars: {
        'duration-width': '40px',
    },
    display: 'flex',
    flexDirection: 'column',
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

export const playlistItem = style([
    style({
        userSelect: 'none',
        display: 'grid',
        gridTemplateAreas: "'title duration' 'artist duration'",
        gridTemplateColumns: `1fr var(--duration-width)`,
        alignItems: 'center',
        gap: globalThemeVars.size.xs,
        selectors: {
            '&.selected, &:hover': {
                backgroundColor: globalThemeVars.button.background.focused,
                color: globalThemeVars.button.color.focused,
            },
        },
    }),
]);
