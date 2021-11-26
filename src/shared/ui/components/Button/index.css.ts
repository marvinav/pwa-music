import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { globalThemeVars } from '../themes/theme.css';
import { VariantProps } from '../types';

export const buttonClass = style({
    backgroundColor: globalThemeVars.button.background.primary,
    color: globalThemeVars.button.color.primary,
    border: globalThemeVars.button.border.primary,
    boxShadow: globalThemeVars.button.shadow.primary,
});

const buttonTypes = ['primary', 'danger', 'disabled', 'focused', 'submit'];

const type = {} as typeof globalThemeVars.button.background;

buttonTypes.forEach((x) => {
    type[x] = {
        backgroundColor: globalThemeVars.button.background[x],
        color: globalThemeVars.button.color[x],
        border: globalThemeVars.button.border[x],
        boxShadow: globalThemeVars.button.shadow[x],
    };
});

export const button = recipe({
    variants: {
        type,
        rounded: {
            true: { borderRadius: '5px' },
        },
    },
    defaultVariants: {
        type: 'primary',
    },
});

export type ButtonVariants = VariantProps<typeof button>;
