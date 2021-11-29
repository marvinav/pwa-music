import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { globalThemeVariables as globalThemeVariables } from '../themes/theme.css';
import { VariantProperties as VariantProperties } from '../types';

export const buttonClass = style({
    backgroundColor: globalThemeVariables.button.background.primary,
    color: globalThemeVariables.button.color.primary,
    border: globalThemeVariables.button.border.primary,
    boxShadow: globalThemeVariables.button.shadow.primary,
});

const buttonTypes = ['primary', 'danger', 'disabled', 'focused', 'submit'];

const type = {} as typeof globalThemeVariables.button.background;

for (const x of buttonTypes) {
    type[x] = {
        backgroundColor: globalThemeVariables.button.background[x],
        color: globalThemeVariables.button.color[x],
        border: globalThemeVariables.button.border[x],
        boxShadow: globalThemeVariables.button.shadow[x],
    };
}

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

export type ButtonVariants = VariantProperties<typeof button>;
